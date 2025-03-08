# History
export TERM=xterm-256color
EDITOR=nvim
HISTFILE=~/.zsh_history  # Location to save history
HISTSIZE=100000           # Number of commands to remember in memory
SAVEHIST=100000          # Number of commands to save in HISTFILE

setopt append_history        # Append to the history file instead of overwriting
setopt inc_append_history    # Save each command to history as you type it
setopt share_history         # Share history across all sessions
setopt hist_ignore_dups      # Don’t record duplicates
setopt hist_ignore_space     # Ignore commands that start with a space
setopt AUTO_CD

export ANDROID_HOME=$HOME/android-sdk
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk
export CHROME_EXECUTABLE=/usr/bin/google-chrome-stable

path+=("/home/filipe/.local/bin")
path+=("/home/filipe/bin")
path+=("$ANDROID_HOME/platform-tools")

source $HOME/.config/zshrc.d/aliases.zsh
# Enable keybindings for cursor movement
bindkey '^[[H' beginning-of-line   # Move to start of line with Home
bindkey '^[[F' end-of-line         # Move to end of line with End
bindkey '^[[3~' delete-char        # Delete forward with Delete key

# Enable word-by-word movement
bindkey '^[[1;5D' backward-word    # Move backward by word with Ctrl + Left Arrow
bindkey '^[[1;5C' forward-word     # Move forward by word with Ctrl + Right Arrow

# Alternative bindings (if the above don’t work)
bindkey '\e[H' beginning-of-line
bindkey '\e[F' end-of-line
bindkey '\e[3~' delete-char
bindkey '\e[1;5D' backward-word
bindkey '\e[1;5C' forward-word

# Delete backward from cursor to the start of the word (Ctrl + Backspace)
bindkey '^H' backward-kill-word    # This uses Ctrl + Backspace if mapped as ^H

# Delete forward from cursor to the end of the word (Ctrl + Delete)
bindkey '^[[3;5~' kill-word        # This binds Ctrl + Delete for forward word deletion

# completions
autoload -U compinit
compinit
zstyle ':completion:*' matcher-list 'm:{a-zA-Z}={A-Za-z}'

source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh


# Key bindings for fzf history search
# Up arrow
autoload -U up-line-or-beginning-search
zle -N up-line-or-beginning-search

# Down arrow
autoload -U down-line-or-beginning-search
zle -N down-line-or-beginning-search

# Function to handle fzf history search
fzf-history-widget() {
  local selected
  setopt localoptions noglobsubst noposixbuiltins pipefail no_aliases 2> /dev/null
  
  selected=( $(fc -rl 1 | awk '{ cmd=$0; sub(/^[ \t]*[0-9]+\**[ \t]+/, "", cmd); if (!seen[cmd]++) print $0 }' |
    FZF_DEFAULT_OPTS="--height ${FZF_TMUX_HEIGHT:-40%} ${FZF_DEFAULT_OPTS} --tac --sync -n2..,.. --tiebreak=index --bind=ctrl-r:toggle-sort ${FZF_CTRL_R_OPTS} +m" fzf) )
  
  local ret=$?
  if [ -n "$selected" ]; then
    num=$selected[1]
    if [ -n "$num" ]; then
      zle vi-fetch-history -n $num
    fi
  fi
  zle reset-prompt
  return $ret
}

# Create widget and bind keys
zle -N fzf-history-widget
bindkey '^[[A' up-line-or-beginning-search    # Up arrow
bindkey '^[[B' down-line-or-beginning-search  # Down arrow
bindkey '^[[5~' fzf-history-widget           # Page Up
bindkey '^[[6~' fzf-history-widget           # Page Down


#starship setup
eval "$(starship init zsh)"

# end-4 config setups
source $HOME/.config/zshrc.d/dots-hyprland.zsh
#source $HOME/.config/zshrc.d/auto-Hypr.sh
eval "$(_AUTO_CPUFREQ_COMPLETE=zsh_source auto-cpufreq)"

alias francinette=/home/filipe/francinette/tester.sh

alias paco=/home/filipe/francinette/tester.sh
. "/home/filipe/.deno/env"
