// swift-tools-version:5.3
import PackageDescription

let package = Package(
    name: "TreeSitterYadl",
    products: [
        .library(name: "TreeSitterYadl", targets: ["TreeSitterYadl"]),
    ],
    dependencies: [
        .package(url: "https://github.com/ChimeHQ/SwiftTreeSitter", from: "0.8.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterYadl",
            dependencies: [],
            path: ".",
            sources: [
                "src/parser.c",
                // NOTE: if your language has an external scanner, add it here.
            ],
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterYadlTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterYadl",
            ],
            path: "bindings/swift/TreeSitterYadlTests"
        )
    ],
    cLanguageStandard: .c11
)
