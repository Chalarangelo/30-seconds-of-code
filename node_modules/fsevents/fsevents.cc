/*
** © 2014 by Philipp Dunkel <pip@pipobscure.com>
** Licensed under MIT License.
*/

#include "nan.h"
#include "uv.h"
#include "v8.h"
#include "CoreFoundation/CoreFoundation.h"
#include "CoreServices/CoreServices.h"
#include <iostream>
#include <vector>

#include "src/storage.cc"
namespace fse {
  class FSEvents : public Nan::ObjectWrap {
  public:
    explicit FSEvents(const char *path);
    ~FSEvents();

    uv_mutex_t mutex;

    // async.cc
    uv_async_t async;
    void asyncStart();
    void asyncTrigger();
    void asyncStop();

    // thread.cc
    uv_thread_t thread;
    CFRunLoopRef threadloop;
    void threadStart();
    static void threadRun(void *ctx);
    void threadStop();

    // methods.cc - internal
    Nan::AsyncResource async_resource;
    void emitEvent(const char *path, UInt32 flags, UInt64 id);

    // Common
    CFArrayRef paths;
    std::vector<fse_event*> events;
    static void Initialize(v8::Local<v8::Object> exports);

    // methods.cc - exposed
    static NAN_METHOD(New);
    static NAN_METHOD(Stop);
    static NAN_METHOD(Start);

  };
}

using namespace fse;

FSEvents::FSEvents(const char *path)
   : async_resource("fsevents:FSEvents") {
  CFStringRef dirs[] = { CFStringCreateWithCString(NULL, path, kCFStringEncodingUTF8) };
  paths = CFArrayCreate(NULL, (const void **)&dirs, 1, NULL);
  threadloop = NULL;
  if (uv_mutex_init(&mutex)) abort();
}
FSEvents::~FSEvents() {
  CFRelease(paths);
  uv_mutex_destroy(&mutex);
}

#ifndef kFSEventStreamEventFlagItemCreated
#define kFSEventStreamEventFlagItemCreated 0x00000010
#endif

#include "src/async.cc"
#include "src/thread.cc"
#include "src/constants.cc"
#include "src/methods.cc"

void FSEvents::Initialize(v8::Local<v8::Object> exports) {
  v8::Isolate* isolate = exports->GetIsolate();
  v8::Local<v8::Context> context = isolate->GetCurrentContext();
  v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(FSEvents::New);
  tpl->SetClassName(Nan::New<v8::String>("FSEvents").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);
  Nan::SetPrototypeTemplate(tpl, "start", Nan::New<v8::FunctionTemplate>(FSEvents::Start));
  Nan::SetPrototypeTemplate(tpl, "stop", Nan::New<v8::FunctionTemplate>(FSEvents::Stop));
  Nan::Set(exports, Nan::New<v8::String>("Constants").ToLocalChecked(), Constants());
  Nan::Set(exports, Nan::New<v8::String>("FSEvents").ToLocalChecked(), tpl->GetFunction(context).ToLocalChecked());
}

NODE_MODULE(fse, FSEvents::Initialize)
