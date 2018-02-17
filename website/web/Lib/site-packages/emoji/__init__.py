# -*- coding: UTF-8 -*-


"""
emoji for Python
~~~~~~~~~~~~~~~~

emoji terminal output for Python.

    >>> import emoji
    >>> print(emoji.emojize('Python is :thumbsup:', use_aliases=True))
    Python is 👍
    >> print(emoji.emojize('Python is :thumbs_up_sign:'))
    Python is 👍
"""


from emoji.core import emojize
from emoji.core import demojize
from emoji.core import get_emoji_regexp
from emoji.unicode_codes import EMOJI_ALIAS_UNICODE
from emoji.unicode_codes import EMOJI_UNICODE
from emoji.unicode_codes import UNICODE_EMOJI
from emoji.unicode_codes import UNICODE_EMOJI_ALIAS


__version__ = '0.4.5'
__author__ = 'Taehoon Kim and Kevin Wurster'
__email__ = 'carpedm20@gmail.com and wursterk@gmail.com'
__source__ = 'https://github.com/carpedm20/emoji/'
__license__ = '''
New BSD License

Copyright (c) 2014-2015, Taehoon Kim and Kevin Wurster
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* The names of its contributors may not be used to endorse or promote products
  derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
'''
