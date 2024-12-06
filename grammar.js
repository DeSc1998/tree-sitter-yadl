/**
 * @file A simple data processing language
 * @author Dennis Schulze
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "yadl",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
