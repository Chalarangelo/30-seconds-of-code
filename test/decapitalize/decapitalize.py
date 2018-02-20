def decapitalize(string, upper_rest=False):
    return str[:1].lower() + (str[1:].upper() if upper_rest else str[1:])