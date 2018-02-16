def capitalize(string, lower_rest=False):
    return string[:1].upper() + (string[1:].lower() if lower_rest else string[1:])