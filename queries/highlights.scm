
[
  "if"
  "elif"
  "else"
] @keyword.conditional

"while" @keyword.repeat
"return" @keyword.return

[
 "and"
 "or"
 "not"
] @keyword.operator

(number) @number
(string) @string
(boolean) @boolean

(assignment
  (identifier) @function
  (function_expression))

(function_call
  (identifier) @function.call)

(comment) @comment
