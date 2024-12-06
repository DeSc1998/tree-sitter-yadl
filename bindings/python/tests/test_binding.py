from unittest import TestCase

import tree_sitter, tree_sitter_yadl


class TestLanguage(TestCase):
    def test_can_load_grammar(self):
        try:
            tree_sitter.Language(tree_sitter_yadl.language())
        except Exception:
            self.fail("Error loading Yadl grammar")
