;;; 1. For terminal blocks (The multiline string)
(terminal_statement
  (multiline_string) @injection.content
  (#set! injection.language "bash"))

;; 2. For code blocks (Any string assigned to an identifier)
(code_entry
  (identifier) @_id (#eq? @_id "file") ;; Or use "content" if you change the key
  (value (string) @injection.content)
  (#set! injection.language "rust")); Highlight content inside 'terminal' strings as Bash
