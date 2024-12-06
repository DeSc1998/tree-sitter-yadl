package tree_sitter_yadl_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_yadl "github.com/desc1998/yadl-zig/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_yadl.Language())
	if language == nil {
		t.Errorf("Error loading Yadl grammar")
	}
}
