#ifndef GSF_CLIP_DATA_H
#define GSF_CLIP_DATA_H

#include <gsf/gsf-fwd.h>

G_BEGIN_DECLS

/**
 * GsfClipFormat:
 * @GSF_CLIP_FORMAT_WINDOWS_CLIPBOARD: Windows clipboard format
 * @GSF_CLIP_FORMAT_MACINTOSH_CLIPBOARD: Macintosh clipboard format
 * @GSF_CLIP_FORMAT_GUID: GUID that contains a format identifier
 * @GSF_CLIP_FORMAT_NO_DATA: No clipboard data
 * @GSF_CLIP_FORMAT_CLIPBOARD_FORMAT_NAME: Custom clipboard format
 * @GSF_CLIP_FORMAT_UNKNOWN: Unknown clipboard type or invalid data
 */

typedef enum {
	GSF_CLIP_FORMAT_WINDOWS_CLIPBOARD = -1,
	GSF_CLIP_FORMAT_MACINTOSH_CLIPBOARD = -2,
	GSF_CLIP_FORMAT_GUID = -3,
	GSF_CLIP_FORMAT_NO_DATA = 0,
	GSF_CLIP_FORMAT_CLIPBOARD_FORMAT_NAME = 1, /* in the file it's actually any positive integer */
	GSF_CLIP_FORMAT_UNKNOWN /* this is our own value for unknown types or invalid data */
} GsfClipFormat;

typedef enum {
	GSF_CLIP_FORMAT_WINDOWS_ERROR = -1,		/* our own value */
	GSF_CLIP_FORMAT_WINDOWS_UNKNOWN = -2,		/* our own value */
	GSF_CLIP_FORMAT_WINDOWS_METAFILE = 3,		/* CF_METAFILEPICT */
	GSF_CLIP_FORMAT_WINDOWS_DIB = 8,		/* CF_DIB */
	GSF_CLIP_FORMAT_WINDOWS_ENHANCED_METAFILE = 14	/* CF_ENHMETAFILE */
} GsfClipFormatWindows;

#define GSF_TYPE_CLIP_DATA		(gsf_clip_data_get_type ())
#define GSF_CLIP_DATA(obj)		(G_TYPE_CHECK_INSTANCE_CAST ((obj), GSF_TYPE_CLIP_DATA, GsfClipData))
#define GSF_CLIP_DATA_CLASS(klass)	(G_TYPE_CHECK_CLASS_CAST ((klass), GSF_TYPE_CLIP_DATA, GsfClipDataClass))
#define GSF_IS_CLIP_DATA(obj)		(G_TYPE_CHECK_INSTANCE_TYPE ((obj), GSF_TYPE_CLIP_DATA))
#define GSF_IS_CLIP_DATA_CLASS(klass)	(G_TYPE_CHECK_CLASS_TYPE ((klass), GSF_TYPE_CLIP_DATA))
#define GSF_CLIP_DATA_GET_CLASS(obj)	(G_TYPE_INSTANCE_GET_CLASS ((obj), GSF_TYPE_CLIP_DATA, GsfClipDataClass))

typedef struct _GsfClipData GsfClipData;
typedef struct _GsfClipDataClass GsfClipDataClass;
typedef struct _GsfClipDataPrivate GsfClipDataPrivate;

struct _GsfClipData {
	GObject object;

	GsfClipDataPrivate *priv;
};

GType gsf_clip_data_get_type      (void);
/* void  gsf_clip_data_register_type (GTypeModule *module); glib dynamic types are not thread safe */

GsfClipData *gsf_clip_data_new (GsfClipFormat format,
				GsfBlob *data_blob);

GsfClipFormat gsf_clip_data_get_format (GsfClipData *clip_data);

GsfBlob *gsf_clip_data_get_data_blob (GsfClipData *clip_data);

GsfClipFormatWindows gsf_clip_data_get_windows_clipboard_format (GsfClipData *clip_data,
								 GError **error);

gconstpointer gsf_clip_data_peek_real_data (GsfClipData *clip_data,
					    gsize *ret_size,
					    GError **error);


G_END_DECLS

#endif /* GSF_CLIP_DATA_H */
