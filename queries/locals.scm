
(assignment
  name: (identifier) @local.definition)

(function_call
  name: (identifier) @local.reference)

(function_expression
  (args)
  (code_block) @local.scope)

(identifier) @local.reference

