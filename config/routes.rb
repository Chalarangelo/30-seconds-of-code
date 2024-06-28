Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  # get "snippets" => "snippets#index", as: :snippets
  # get "snippets/:id" => "snippets#show", as: :snippet

  # get "collections" => "collections#index", as: :collections
  # get "collections/:id" => "collections#show", as: :collection

  # get "languages" => "languages#index", as: :languages
  # get "languages/:id" => "languages#show", as: :language
end
