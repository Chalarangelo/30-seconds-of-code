#ifndef GSF_BLOB_H
#define GSF_BLOB_H

#include <gsf/gsf-fwd.h>

G_BEGIN_DECLS

#define GSF_BLOB_TYPE			(gsf_blob_get_type ())
#define GSF_BLOB(obj)		  	(G_TYPE_CHECK_INSTANCE_CAST ((obj), GSF_BLOB_TYPE, GsfBlob))
#define GSF_BLOB_CLASS(klass)		(G_TYPE_CHECK_CLASS_CAST ((klass), GSF_BLOB_TYPE, GsfBlobClass))
#define GSF_IS_BLOB(obj)		(G_TYPE_CHECK_INSTANCE_TYPE ((obj), GSF_BLOB_TYPE))
#define GSF_IS_BLOB_CLASS(klass)	(G_TYPE_CHECK_CLASS_TYPE ((klass), GSF_BLOB_TYPE))
#define GSF_BLOB_GET_CLASS(obj)         (G_TYPE_INSTANCE_GET_CLASS ((obj), GSF_BLOB_TYPE, GsfBlobClass))

/* Deprecated old typo */
#define GSF_TYPE_BLOB			(gsf_blob_get_type ())

typedef struct _GsfBlobClass GsfBlobClass;
typedef struct _GsfBlobPrivate GsfBlobPrivate;

struct _GsfBlob {
	GObject object;
	GsfBlobPrivate *priv;
};

GType gsf_blob_get_type (void);
/* void  gsf_blob_register_type (GTypeModule *module); glib dynamic types are not thread safe */

GsfBlob *gsf_blob_new (gsize size,
		       gconstpointer data_to_copy,
		       GError **error);

gsize gsf_blob_get_size (GsfBlob const *blob);

gconstpointer gsf_blob_peek_data (GsfBlob const *blob);

G_END_DECLS

#endif
