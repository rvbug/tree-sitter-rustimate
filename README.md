# Rustimate Treesitter 

Tree-sitter grammar for **Rustimate Studio Language (RSL)**. Checkout [Rustimate](https://qubitai.in/rustimate.html)


<img width="606" height="422" alt="image" src="https://github.com/user-attachments/assets/4221719f-7d17-4a4b-8f33-dceb279e8fa5" />



# Installation Instructions

## Neovim

### 1. Using [lazy.nvim](https://github.com/folke/lazy.nvim)

Add the plugin to your configuration and restart neovim. 

NOTE: If you do not use `auto_install = true` then in your list of languages add `rustimate` in the `ensure_installed` block.

```lua
return {
  "nvim-treesitter/nvim-treesitter",
  dependencies = { "rvbug/tree-sitter-rustimate" },
  build = ":TSUpdate",

  config = function()
    local config = require("nvim-treesitter.configs")
    local parser_config = require("nvim-treesitter.parsers").get_parser_configs()

    parser_config.rustimate = {
      install_info = {
        url = "https://github.com/rvbug/tree-sitter-rustimate.git",
        files = { "src/parser.c" }, 
        branch = "main",
      },
      filetype = "rsl",
    }
  config.setup({
       -- if you use auto_install then skip ensure_installed block
        --auto_install = true,
        ensure_installed = {
          "rustimate",
  })
  end,
}
```





## Other Package Manager

```lua
vim.filetype.add({
  extension = {
    rsl = "rsl",
  },
})
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


## Helix

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



## Zed

Zed support is available via the Rustimate extension. For manual install:

    1. Clone this repo.
    2. In Zed, Extensions > Install Dev Extension > Select this folder.


## emacs

```elisp
(add-to-list 'treesit-language-source-alist
             '(rustimate "[https://github.com/rvbug/tree-sitter-rustimate](https://github.com/rvbugtree-sitter-rustimate)"))
(treesit-install-language-grammar 'rustimate)
```


## Sublime Text

```json
{
    "user_parsers": [
        {
            "name": "rustimate",
            "repo": "https://github.com/rvbug/tree-sitter-rustimate",
            "scopes": ["source.rsl"]
        }
    ]

```



## Vim
If you use Vim, give this setup a try.

```
lua << EOF
local parser_config = require("nvim-treesitter.parsers").get_parser_configs()

-- 1. Register the parser
parser_config.rustimate = {
  install_info = {
    url = "https://github.com/rvbug/tree-sitter-rustimate.git",
    files = { "src/parser.c" },
    branch = "main",
  },
  filetype = "rsl",
}

-- 2. Setup (Note: Ensure textobjects plugin is installed if using that block)
require("nvim-treesitter.configs").setup({
  ensure_installed = { "rustimate" },
  highlight = { enable = true },
  indent = { enable = true },
  -- Textobjects requires 'nvim-treesitter/nvim-treesitter-textobjects'
  textobjects = {
    enable = true,
    move = {
      enable = true,
      set_jumps = true,
      goto_next_start = { ["]m"] = "@function.outer" },
      goto_previous_start = { ["[m"] = "@function.outer" },
    },
  },
})
EOF

```


## Lapce

```toml

[language.rustimate]
name = "rustimate"
extensions = ["rsl"]
grammar = "rustimate"

[[grammar]]
name = "rustimate"
source = { git = "https://github.com/rvbug/tree-sitter-rustimate", rev = "main" }

```



# Uninstall 

```bash
# Remove cloned repo 
rm -rf ~/.local/share/nvim/lazy/tree-sitter-rustimate

# Remove compiled binary 
rm -f ~/.local/share/nvim/nvim-treesitter/parser/rustimate.so

# If you use Mason, remove here too 
rm -rf ~/.local/share/nvim/mason/packages/tree-sitter-rustimate
```
Finally in your treesitter neovim configuration , remove "rustimate" form list of languages
