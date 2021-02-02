#!/bin/bash

# Usage/arguments:
#  - $1: GitHub repository URL  (e.g. https://github.com/30-seconds/30-seconds-of-yada)
#  - $2: Directory name         (e.g. 30yada)
#  - $3: Name                   (e.g. "30 seconds of yada")
#  - $4: Slug                   (e.g. yada)
# Example:
#  add_content_source https://github.com/30-seconds/30-seconds-of-yada 30yada "30 seconds of yada" yada
add_content_source() {
  git submodule add -b master $1 "./content/sources/$2"
  git config -f .gitmodules submodule.content/sources/$2.update checkout
  git submodule update --remote
  echo "{
  \"name\": \"$3\",
  \"dirName\": \"$2\",
  \"repoUrl\": \"$1\",
  \"snippetPath\": \"snippets\",
  \"requirables\": [
    \"snippet_data/snippets.json\"
  ],
  \"slug\": \"$4\",
  \"featured\": 500,
  \"iconName\": \"$4\",
  \"biasPenaltyMultiplier\": 1.00
}" >> "./content/configs/$2.json"
}

add_content_source $1 $2 "$3" $4
