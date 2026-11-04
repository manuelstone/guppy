#!/usr/bin/env zsh
# Installs the guppy command from a clone of Guppy: a link in ~/.local/bin and the zsh completion.
# Run it again at any time; it changes nothing that is already in place. Update with git pull.

emulate -L zsh
setopt err_return

cli=${0:A:h}
bin_dir="$HOME/.local/bin"
zshrc="${ZDOTDIR:-$HOME}/.zshrc"
start='# >>> guppy >>>'
finish='# <<< guppy <<<'

chmod +x "$cli/guppy"
mkdir -p "$bin_dir"
ln -sfn "$cli/guppy" "$bin_dir/guppy"
print -- "Linked $bin_dir/guppy to $cli/guppy."

if [[ -f $zshrc ]] && grep -qF -- "$start" "$zshrc"; then
  print -- "The completion is already set up in $zshrc."
elif [[ -f $zshrc ]] && grep -q 'compinit' "$zshrc"; then
  print -- "$zshrc already loads compinit. Add this line before it to get the completion:
  fpath=($cli/completions \$fpath)"
else
  print -r -- "
$start
fpath=($cli/completions \$fpath)
autoload -Uz compinit && compinit
$finish" >> "$zshrc"
  print -- "Added the completion to $zshrc."
fi

if (( ! ${path[(I)$bin_dir]} )); then
  print -- "Warning: $bin_dir is not in your PATH. Add it in $zshrc."
fi

command -v tmux >/dev/null || print -- "Warning: tmux is not installed (brew install tmux)."
print -- "Done. Open a new terminal, or run: exec zsh"
