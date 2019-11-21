#!/bin/bash
fetch_content_sources() {
  echo "Fetching content sources started..."
  git submodule update --recursive --remote
  echo "Fetching content sources complete"
}

fetch_content_sources
