/**
 * @file A simple data processing language
 * @author Dennis Schulze
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "yadl",

  word: $ => $.keywords,

  rules: {
    source_file: $ => repeat($._statement),

    _statement: $ => seq(
      optional(choice(
        $.return_statement,
        $.assignment,
        $._loop,
        $.if_statement,
        $.function_call,
      )),
      $._line_end),

    return_statement: $ => seq("return", $._expression),
    assignment: $ => seq(field("name", $.identifier), "=", $._expression),

    if_statement: $ => seq(
      $._initial_if_branch,
      repeat($._middle_if_branch),
      optional($._final_if_branch)
    ),
    _initial_if_branch: $ => seq("if", $.condition, $.code_block),
    _middle_if_branch: $ => seq("elif", $.condition, $.code_block),
    _final_if_branch: $ => seq("else", $.code_block),

    _loop: $ => choice($.while_loop),
    while_loop: $ => seq("while", $.condition, $.code_block),

    function_call: $ => seq(
      field("name", $.identifier), "(", optional($.call_args) ,")"
    ),
    call_args: $ => prec(9, seq( $._expression, repeat(seq(",", $._expression)))),

    code_block: $ => seq("{", repeat($._statement), "}"),

    condition: $ => seq("(", $._expression, ")"),

    _expression: $ => choice(
      $.boolean,
      $.number,
      $.string,
      $.identifier,
      $.function_expression,
      $.function_call,

      seq("(", $._expression, ")"),

      $.binary_expression,
      $.unary_expression,
    ),
    binary_expression: $ => choice(
      prec.right(8, seq( $._expression, "^", $._expression )),
      prec.left(6, seq( $._expression, "*", $._expression )),
      prec.left(6, seq( $._expression, "/", $._expression )),
      prec.left(6, seq( $._expression, "%", $._expression )),
      prec.left(5, seq( $._expression, "+", $._expression )),
      prec.left(5, seq( $._expression, "-", $._expression )),

      prec.left(4, seq( $._expression, $._compare_op, $._expression )),

      prec.left(2, seq( $._expression, "and", $._expression )),
      prec.left(1, seq( $._expression, "or", $._expression )),
    ),
    _compare_op: $ => choice(
      "==", "!=", "<", ">", "<=", ">=",
    ),
    unary_expression: $ => choice(
      prec(7, seq("-", $._expression )),
      prec(7, seq("not", $._expression )),
    ),

    function_expression: $ => seq(
      "(", optional($.args) ,")", "=>",
      choice( $._expression, $.code_block )
    ),
    args: $ => prec(9, seq( $.identifier, repeat(seq(",", $.identifier)))),

    comment: $ => seq("//", /[^\n\r]*/),

    _line_end: $ => seq(optional($.comment), choice(/\n/, /\r/, /\r\n/)),

    identifier: $ => /[a-zA-Z][a-zA-Z0-9_]*/,
    string: $ => choice(
      /[f]?"[^\n\r]*"/,
      /[f]?'[^\n\r]*'/,
    ),
    boolean: $ => choice("true", "false"),
    number: $ => choice(
      $._decimal_number,
      $._hexdecimal_number,
      $._octal_number,
      $._binary_number,
    ),

    _decimal_number: $ => choice(
        /[0-9]+/,
        /\.[0-9]+/,
        /[0-9]+\.[0-9]+/
    ),
      _hexdecimal_number: $ => choice(
        /0x[0-9a-fA-f]+/,
        /0x\.[0-9a-fA-f]+/,
        /0x[0-9a-fA-f]+\.[0-9a-fA-f]+/
    ),
      _octal_number: $ => choice(
        /0o[0-7]+/,
        /0o\.[0-7]+/,
        /0o[0-7]+\.[0-7]+/
    ),
      _binary_number: $ => choice(
        /0b[01]+/,
        /0b\.[01]+/,
        /0b[01]+\.[01]+/
    ),

    keywords: $ => /(if)|(elif)|(else)|(while)|(return)|(not)|(and)|(or)/,
  }
});
