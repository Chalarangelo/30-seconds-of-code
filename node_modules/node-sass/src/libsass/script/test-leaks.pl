#!/usr/bin/perl
############################################################
# this perl script is meant for developers only!
# it will run all spec-tests (without verifying the
# results) via valgrind to detect possible leaks.
# expect that it takes 1h or more to finish!
############################################################
# Prerequisite install: `cpan Parallel::Runner`
# You may also need to install `cpan File::Find`
# You may also need to install `cpan IPC::Run3`
############################################################
# usage: `perl test-leaks.pl [threads]`
# example: `time perl test-leaks.pl 4`
############################################################
# leaks will be reported in "mem-leaks.log"
############################################################

use strict;
use warnings;

############################################################
# configurations (you may adjust)
############################################################

# number of threads to use
my $threads = $ARGV[0] || 8;

# the github repositories to checkout
# if you need other branch, clone manually!
my $sassc = "https://www.github.com/sass/sassc";
my $specs = "https://www.github.com/sass/sass-spec";

############################################################
# load modules
############################################################

use IPC::Run3;
use IO::Handle;
use Fcntl qw(:flock);
use File::Find::Rule;
use Parallel::Runner;
use List::Util qw(shuffle);

############################################################
# check prerequisites
############################################################

unless (-d "../sassc") {
  warn "sassc folder not found\n";
  warn "trying to checkout via git\n";
  system("git", "clone", $sassc, "../sassc");
  die "git command did not exit gracefully" if $?;
}

unless (-d "../sass-spec") {
  warn "sass-spec folder not found\n";
  warn "trying to checkout via git\n";
  system("git", "clone", $specs, "../sass-spec");
  die "git command did not exit gracefully" if $?;
}

unless (-f "../sassc/bin/sassc") {
  warn "sassc executable not found\n";
  warn "trying to compile via make\n";
  system("make", "-C", "../sassc", "-j", $threads);
  die "make command did not exit gracefully" if $?;
}

############################################################
# main runner code
############################################################

my $root = "../sass-spec/spec";
my @files = File::Find::Rule->file()
            ->name('input.scss')->in($root);

open(my $leaks, ">", "mem-leaks.log");
die "Cannot open log" unless $leaks;
my $runner = Parallel::Runner->new($threads);
die "Cannot start runner" unless $runner;

print "##########################\n";
print "Testing $#files spec files\n";
print "##########################\n";

foreach my $file (shuffle @files) {
  $runner->run(sub {
    $| = 1; select STDOUT;
    my $cmd = sprintf('../sassc/bin/sassc %s', $file);
    my $check = sprintf('valgrind --leak-check=yes %s', $cmd);
    run3($check, undef, \ my $out, \ my $err);
    if ($err =~ m/in use at exit: 0 bytes in 0 blocks/) {
      print "."; # print success indicator
    } else {
      print "F"; # print error indicator
      flock($leaks, LOCK_EX) or die "Cannot lock log";
      $leaks->printflush("#" x 80, "\n", $err, "\n");
      flock($leaks, LOCK_UN) or die "Cannot unlock log";
    }
  });
}

$runner->finish;
