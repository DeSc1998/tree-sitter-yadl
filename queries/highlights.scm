
"if" @keyword
"elif" @keyword
"else" @keyword
"return" @keyword
"while" @keyword
"and" @keyword
"or" @keyword
"not" @keyword
"true" @keyword
"false" @keyword

(number) @number
(string) @string

(assignment
  (identifier) @function
  (function_expression))

(function_call
  (identifier) @function)

(comment) @comment
