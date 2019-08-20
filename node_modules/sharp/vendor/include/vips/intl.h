/* i18n stuff for vips.
 */

#ifndef VIPS_INTL_H
#define VIPS_INTL_H

#ifdef __cplusplus
extern "C" {
#endif /*__cplusplus*/

const char *vips__gettext( const char *msgid );
const char *vips__ngettext( const char *msgid,
	const char *plural, unsigned long int n );

#ifdef ENABLE_NLS

#include <libintl.h>
#define _(String) vips__gettext(String)
/* ngettext may be defined as a macro if we're optimised.
 */
#ifdef ngettext
#undef ngettext
#endif /*ngettext*/
#define ngettext(String,Plural,number) vips__ngettext(String,Plural,number)
#ifdef gettext_noop
#define N_(String) gettext_noop(String)
#else
#define N_(String) (String)
#endif

#else /*!ENABLE_NLS*/

#define _(String) (String)
#define N_(String) (String)
#define textdomain(String) (String)
#define gettext(String) (String)
#define dgettext(Domain,String) (String)
#define dcgettext(Domain,String,Type) (String)
#define bindtextdomain(Domain,Directory) (Domain) 
#define bind_textdomain_codeset(Domain,Codeset) (Codeset) 
#define ngettext(S, P, N) ((N) == 1 ? (S) : (P))
#define dngettext(D, S, P, N) ngettext(S, P, N)

#endif /* ENABLE_NLS */

#ifdef __cplusplus
}
#endif /*__cplusplus*/

#endif /* VIPS_INTL_H */
