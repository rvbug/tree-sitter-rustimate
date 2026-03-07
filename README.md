# Rustimate Treesitter 

Tree-sitter grammar for **Rustimate Studio Language (RSL)**.. Checkout [Rustimate](rustimate | Animate Attention.) 

# Installation Instructions

## Neovim

### 1. Using [lazy.nvim](https://github.com/folke/lazy.nvim)

Add the plugin to your configuration:

```lua
{
  "nvim-treesitter/nvim-treesitter",
  dependencies = { "rvbug/tree-sitter-rustimate" },
  opts = function(_, opts)
    local parser_config = require("nvim-treesitter.parsers").get_parser_configs()
    parser_config.rustimate = {
      install_info = {
        url = "https://github.com/rvbug/tree-sitter-rustimate",
        files = { "src/parser.c" },
        branch = "main",
      },
      filetype = "rsl",
    }
    if type(opts.ensure_installed) == "table" then
      table.insert(opts.ensure_installed, "rustimate")
    end
  end,
}

```


## Other Package Manager

```lua
local parser_config = require("nvim-treesitter.parsers").get_parser_configs()
parser_config.rustimate = {
  install_info = {
    url = "https://github.com/rvbug/tree-sitter-rustimate",
    files = { "src/parser.c" },
    branch = "main",
  },
  filetype = "rsl",
}
```


### Helix

1. Add to `~/.config/helix/languages.toml`:
   ```toml
   [[language]]
   name = "rustimate"
   file-types = ["rsl"]
   
   [[grammar]]
   name = "rustimate"
   source = { git = "[https://github.com/rvbug/tree-sitter-rustimate](https://github.com/rvbug/tree-sitter-rustimate)", rev = "main" }
```

2. Run `hx --grammar fetch` and `hx --grammar build`


###Zed

Zed support is available via the Rustimate extension. For manual install:

    1. Clone this repo.
    2. In Zed, Extensions > Install Dev Extension > Select this folder.


### emacs

```emacs-lisp
(add-to-list 'treesit-language-source-alist
             '(rustimate "[https://github.com/rvbug/tree-sitter-rustimate](https://github.com/rvbugtree-sitter-rustimate)"))
(treesit-install-language-grammar 'rustimate)
```

# Future Support

A. Lapce
B. Sublime Text
C. Vim
