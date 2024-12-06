import XCTest
import SwiftTreeSitter
import TreeSitterYadl

final class TreeSitterYadlTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_yadl())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Yadl grammar")
    }
}
