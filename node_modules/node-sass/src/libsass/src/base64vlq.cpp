#include "sass.hpp"
#include "base64vlq.hpp"

namespace Sass {

  std::string Base64VLQ::encode(const int number) const
  {
    std::string encoded = "";

    int vlq = to_vlq_signed(number);

    do {
      int digit = vlq & VLQ_BASE_MASK;
      vlq >>= VLQ_BASE_SHIFT;
      if (vlq > 0) {
        digit |= VLQ_CONTINUATION_BIT;
      }
      encoded += base64_encode(digit);
    } while (vlq > 0);

    return encoded;
  }

  char Base64VLQ::base64_encode(const int number) const
  {
    int index = number;
    if (index < 0) index = 0;
    if (index > 63) index = 63;
    return CHARACTERS[index];
  }

  int Base64VLQ::to_vlq_signed(const int number) const
  {
    return (number < 0) ? ((-number) << 1) + 1 : (number << 1) + 0;
  }

  const char* Base64VLQ::CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  const int Base64VLQ::VLQ_BASE_SHIFT = 5;
  const int Base64VLQ::VLQ_BASE = 1 << VLQ_BASE_SHIFT;
  const int Base64VLQ::VLQ_BASE_MASK = VLQ_BASE - 1;
  const int Base64VLQ::VLQ_CONTINUATION_BIT = VLQ_BASE;

}
