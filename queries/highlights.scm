
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
  name: (identifier) @function
  (function_expression))

(function_call
  name: (identifier) @function)

(function_call
  name: (identifier) @function.buildin (#is-not? local))

(comment) @comment
