#!/usr/bin/env bash
###-begin-{{cmd}}-completion-###
#
# {{cmd}} command completion script
#
# Installation: {{cmd}} completion >> ~/.bashrc  (or ~/.zshrc)
# Or, maybe: {{cmd}} completion > /usr/local/etc/bash_completion.d/{{cmd}}
#

COMP_WORDBREAKS=${COMP_WORDBREAKS/=/}
COMP_WORDBREAKS=${COMP_WORDBREAKS/@/}
export COMP_WORDBREAKS

if complete &>/dev/null; then
  _{{cmd}}_completion () {
    local si="$IFS"
    IFS=$'\n' COMPREPLY=($(COMP_CWORD="$COMP_CWORD" \
                           COMP_LINE="$COMP_LINE" \
                           COMP_POINT="$COMP_POINT" \
                           {{cmd}} completion -- "${COMP_WORDS[@]}" \
                           2>/dev/null)) || return $?
    IFS="$si"
  }
  complete -F _{{cmd}}_completion {{cmd}}
elif compctl &>/dev/null; then
  _{{cmd}}_completion () {
    local cword line point words si
    read -Ac words
    read -cn cword
    let cword-=1
    read -l line
    read -ln point
    si="$IFS"
    IFS=$'\n' reply=($(COMP_CWORD="$cword" \
                       COMP_LINE="$line" \
                       COMP_POINT="$point" \
                       {{cmd}} completion -- "${words[@]}" \
                       2>/dev/null)) || return $?
    IFS="$si"
  }
  compctl -K _{{cmd}}_completion {{cmd}}
fi
###-end-{{cmd}}-completion-###
