Name:           libsass
Version:        %{version}
Release:        1%{?dist}
Summary:        A C/C++ implementation of a Sass compiler

License:        MIT
URL:            http://libsass.org
Source0:        %{name}-%{version}.tar.gz

BuildRequires:  gcc-c++ >= 4.7
BuildRequires:  autoconf
BuildRequires:  automake
BuildRequires:  libtool


%description
LibSass is a C/C++ port of the Sass engine. The point is to be simple, fast, and easy to integrate.

%package        devel
Summary:        Development files for %{name}
Requires:       %{name}%{?_isa} = %{version}-%{release}


%description    devel
The %{name}-devel package contains libraries and header files for
developing applications that use %{name}.


%prep
%setup -q
autoreconf --force --install


%build
%configure --disable-static \
           --disable-tests \
           --enable-shared

make %{?_smp_mflags}


%install
%make_install
find $RPM_BUILD_ROOT -name '*.la' -exec rm -f {} ';'


%post -p /sbin/ldconfig

%postun -p /sbin/ldconfig


%files
%doc Readme.md LICENSE
%{_libdir}/*.so.*

%files devel
%doc
%{_includedir}/*
%{_libdir}/*.so
%{_libdir}/pkgconfig/*.pc


%changelog
* Tue Feb 10 2015 Gawain Lynch <gawain.lynch@gmail.com> - 3.1.0-1
- Initial SPEC file

