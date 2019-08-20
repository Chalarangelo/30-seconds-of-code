This is an article about how to help with LibSass issues. Issue triage is a fancy word for explaining how we deal with incoming issues and make sure that the right problems get worked on. The lifecycle of an issue goes like this:

1. Issue is reported by a user.
2. If the issue seems like a bug, then the "bug" tag is added.
3. If the reporting user didn't also create a spec test over at sass/sass-spec, the "needs test" tag is added.
4. Verify that Ruby Sass *does not* have the same bug. LibSass strives to be an exact replica of how Ruby Sass works. If it's an issue that neither project has solved, please close the ticket with the "not in sass" label.
5. The smallest possible breaking test is created in sass-spec. Cut away any extra information or non-breaking code until the core issue is made clear.
6. Again, verify that the expected output matches the latest Ruby Sass release. Do this by using your own tool OR by running ./sass-spec.rb in the spec folder and making sure that your test passes!
7. Create the test cases in sass-spec with the name spec/LibSass-todo-issues/issue_XXX/input.scss and expected_output.css where the XXX is the issue number here.
8. Commit that test to sass-spec, making sure to reference the issue in the comment message like "Test to demonstrate sass/LibSass#XXX".
9. Once the spec test exists, remove the "needs test" tag and replace it with "test written".
10. A C++ developer will then work on the issue and issue a pull request to fix the issue.
11. A core member verifies that the fix does actually fix the spec tests.
12. The fix is merged into the project.
13. The spec is moved from the LibSass-todo-issues folder into LibSass-closed-issues
14. The issue is closed
15. Have a soda pop or enjoyable beverage of your choice
