from pkg_resources.extern import VendorImporter

names = 'six',
VendorImporter(__name__, names, 'pkg_resources._vendor').install()
