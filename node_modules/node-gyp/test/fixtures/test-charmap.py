import sys
import locale

reload(sys)

def main():
  encoding = locale.getdefaultlocale()[1]
  if not encoding:
    return False

  sys.setdefaultencoding(encoding)
  textmap = {
    'cp936': u'\u4e2d\u6587',
    'cp1252': u'Lat\u012Bna',
    'cp932': u'\u306b\u307b\u3093\u3054'
  }
  if textmap.has_key(encoding):
    print textmap[encoding]
  return True

if __name__ == '__main__':
  print main()
