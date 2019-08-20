(*
Copyright (c) 2015-present, Facebook, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*)

property targetTab: null
property targetTabIndex: -1
property targetWindow: null

on run argv
  set theURL to item 1 of argv

  tell application "Chrome"

    if (count every window) = 0 then
      make new window
    end if

    -- 1: Looking for tab running debugger
    -- then, Reload debugging tab if found
    -- then return
    set found to my lookupTabWithUrl(theURL)
    if found then
      set targetWindow's active tab index to targetTabIndex
      tell targetTab to reload
      tell targetWindow to activate
      set index of targetWindow to 1
      return
    end if

    -- 2: Looking for Empty tab
    -- In case debugging tab was not found
    -- We try to find an empty tab instead
    set found to my lookupTabWithUrl("chrome://newtab/")
    if found then
      set targetWindow's active tab index to targetTabIndex
      set URL of targetTab to theURL
      tell targetWindow to activate
      return
    end if

    -- 3: Create new tab
    -- both debugging and empty tab were not found
    -- make a new tab with url
    tell window 1
      activate
      make new tab with properties {URL:theURL}
    end tell
  end tell
end run

-- Function:
-- Lookup tab with given url
-- if found, store tab, index, and window in properties
-- (properties were declared on top of file)
on lookupTabWithUrl(lookupUrl)
  tell application "Chrome"
    -- Find a tab with the given url
    set found to false
    set theTabIndex to -1
    repeat with theWindow in every window
      set theTabIndex to 0
      repeat with theTab in every tab of theWindow
        set theTabIndex to theTabIndex + 1
        if (theTab's URL as string) contains lookupUrl then
          -- assign tab, tab index, and window to properties
          set targetTab to theTab
          set targetTabIndex to theTabIndex
          set targetWindow to theWindow
          set found to true
          exit repeat
        end if
      end repeat

      if found then
        exit repeat
      end if
    end repeat
  end tell
  return found
end lookupTabWithUrl
