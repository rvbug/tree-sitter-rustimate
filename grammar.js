/**
 * @file Tree-sitter grammar for the Rustimate Studio Language (RSL), a DSL for code-based storytelling and presentations
 * @author Rakesh Venkat <qubitai.in@gmail.com>
 * @license MIT
 */


/// <reference types="tree-sitter-cli" />

export default grammar({
  name: "rustimate",

  rules: {

    source_file: $ => repeat(choice(
      $.config_block,
      $.scene_block,
      $.statement
    )),

    // ---------- statements ----------

    statement: $ => choice(
      $.text_statement,
      $.code_block
    ),

    text_statement: $ => seq(
      'text',
      $.string
    ),

    terminal_statement: $ => seq(
      'terminal',
      $.multiline_string
    ),

    // ---------- scene ----------

    scene_block: $ => seq(
      'scene',
      $.string,
      '{',
      repeat(choice(
        $.code_block,
        $.text_statement,
        $.terminal_statement,
        $.scene_property
      )),
      '}'
    ),

    scene_property: $ => seq(
      $.identifier,
      ':',
      $.value
    ),

    // ---------- config ----------

    config_block: $ => seq(
      'config',
      '{',
      repeat($.config_entry),
      '}'
    ),

    config_entry: $ => seq(
      $.identifier,
      ':',
      $.value
    ),

    // ---------- code block ----------

    code_block: $ => seq(
      'code',
      '{',
      repeat($.code_entry),
      '}'
    ),

    code_entry: $ => seq(
      $.identifier,
      ':',
      $.value
    ),

    // ---------- values ----------

    value: $ => choice(
      $.string,
      $.range,
      $.list,
      $.number,
      $.identifier
    ),

    range: $ => seq(
      $.number,
      '..',
      $.number
    ),

    list: $ => seq(
      '[',
      $.number,
      repeat(seq(',', $.number)),
      ']'
    ),

    number: $ => /\d+/,

    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,

    // ---------- strings ----------

    string: $ => choice(
      seq('"', repeat(choice($.escape_sequence, /[^"\\]/)), '"'),
      seq("'", repeat(choice($.escape_sequence, /[^'\\]/)), "'")
    ),

    
    multiline_string: $ => seq(
      '"""',
      repeat(choice(
        /[^"]+/,               // Any characters that aren't quotes
        seq('"', /[^"]/),      // A single quote followed by a non-quote
        seq('""', /[^"]/)     // Two quotes followed by a non-quote
      )),
      '"""'
    ),

    escape_sequence: $ => /\\./,
  }
});
