fn main() {
    cc::Build::new()
        .file("src/parser.c")
        .include("src")
        .compile("tree-sitter-rustimate");
}
