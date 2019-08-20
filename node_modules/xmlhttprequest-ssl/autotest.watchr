def run_all_tests
    puts `clear`
    puts `node tests/test-constants.js`
    puts `node tests/test-headers.js`
    puts `node tests/test-request.js`
end
watch('.*.js') { run_all_tests }
run_all_tests
