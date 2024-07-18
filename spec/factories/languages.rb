FactoryBot.define do
  factory :language do
    cid { 'lang' }
    long { 'lang' }
    short { 'lg' }
    name { 'Language' }
  end

  trait :js do
    cid { 'javascript' }
    long { 'javascript' }
    short { 'js' }
    name { 'JavaScript' }
  end

  trait :css do
    cid { 'css' }
    long { 'css' }
    short { 'css' }
    name { 'CSS' }
  end

  trait :html do
    cid { 'html' }
    long { 'html' }
    short { 'html' }
    name { 'HTML' }
  end

  trait :react do
    cid { 'react' }
    long { 'react' }
    short { 'jsx' }
    name { 'React' }
  end

  trait :python do
    cid { 'python' }
    long { 'python' }
    short { 'py' }
    name { 'Python' }
  end

  trait :git do
    cid { 'git' }
    long { 'git' }
    short { 'shell' }
    name { 'Git' }
  end
end
