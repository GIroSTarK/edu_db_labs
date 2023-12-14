/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "f6e16725e7eb35541707df5904f791d1"
  },
  {
    "url": "assets/css/0.styles.83c7167e.css",
    "revision": "cefff3f8c27847bd006c320ad3563c8b"
  },
  {
    "url": "assets/img/aboba.9afd0d8a.jpg",
    "revision": "9afd0d8a856a1d456ca9093c518f9168"
  },
  {
    "url": "assets/img/add_role.5bcaeb17.png",
    "revision": "5bcaeb17445a9cd4aee68786c19cc96c"
  },
  {
    "url": "assets/img/add_user.c73fbd6d.png",
    "revision": "c73fbd6da1ce4d06f8c6cff06c70ae45"
  },
  {
    "url": "assets/img/change_quiz.0c42baf8.png",
    "revision": "0c42baf8f9277457ee925d82310fd10d"
  },
  {
    "url": "assets/img/change_role_info.427f8442.png",
    "revision": "427f8442c2f9ac145ff0973bcaf0d409"
  },
  {
    "url": "assets/img/change_user.45389b67.png",
    "revision": "45389b67fbd9dc357bed1d069ef4a9f9"
  },
  {
    "url": "assets/img/create_question.e7c8e9fc.png",
    "revision": "e7c8e9fcabc5a411da273be00e7e4500"
  },
  {
    "url": "assets/img/create_quiz.9d870040.png",
    "revision": "9d8700408672812a61a793aac74bb7a4"
  },
  {
    "url": "assets/img/delete_question.d02ea681.png",
    "revision": "d02ea6819af5fce8b8790a6aa5ee54eb"
  },
  {
    "url": "assets/img/delete_quiz.868c67f6.png",
    "revision": "868c67f6a34bf6c735e36e4f36f1be42"
  },
  {
    "url": "assets/img/delete_role.56756efd.png",
    "revision": "56756efd04a6ad26d3aa17c6dbd69875"
  },
  {
    "url": "assets/img/delete_user.399163f0.png",
    "revision": "399163f01a8f43a2a73ed3b0ab4711ba"
  },
  {
    "url": "assets/img/edit_question.eab09096.png",
    "revision": "eab0909655a1ccc4626ca8dceabc663b"
  },
  {
    "url": "assets/img/get_all_questions.12505ae9.png",
    "revision": "12505ae9b2326523261437808ca634dc"
  },
  {
    "url": "assets/img/get_all_quizzes.3b4b2a5c.png",
    "revision": "3b4b2a5cb6250cfd4b0eceed06d6b18c"
  },
  {
    "url": "assets/img/get_all_roles.e9d90850.png",
    "revision": "e9d90850e4b4c5b865660e81327ab714"
  },
  {
    "url": "assets/img/get_all_users1.0e8e1988.png",
    "revision": "0e8e1988193d2d00e79d8f57e6484dca"
  },
  {
    "url": "assets/img/get_all_users2.41ef6111.png",
    "revision": "41ef61115f398dbbf59a5e9f7a6e02c6"
  },
  {
    "url": "assets/img/get_all_with_role1.eff8cfa3.png",
    "revision": "eff8cfa3a8ea8ddfb9251a9fd983902f"
  },
  {
    "url": "assets/img/get_all_with_role2.22b2e3d6.png",
    "revision": "22b2e3d658ce403d889325959792eb01"
  },
  {
    "url": "assets/img/get_one_question.a29a73b5.png",
    "revision": "a29a73b5428c87fea55d0f232e59f10e"
  },
  {
    "url": "assets/img/get_one_quiz.498982da.png",
    "revision": "498982da6bb9ca7d081f911f192bc5ea"
  },
  {
    "url": "assets/img/get_one_role.7f029084.png",
    "revision": "7f02908451bbd666b6667d31fe5d3b24"
  },
  {
    "url": "assets/img/get_one_user_by_nick.c10ec4fe.png",
    "revision": "c10ec4fe5d2a5eda147b9e0bc4ddbf7e"
  },
  {
    "url": "assets/img/get_one_user.7a400a15.png",
    "revision": "7a400a151b3b97f4f215b387cd644162"
  },
  {
    "url": "assets/img/get_questions_by_quiz_id.d29d5822.png",
    "revision": "d29d58224009ab4ba889f18f5b1ac272"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/img/server_start.7cf2bdc6.png",
    "revision": "7cf2bdc6a9eff58a9b961079f557af63"
  },
  {
    "url": "assets/js/10.9711ea57.js",
    "revision": "f22cf866eb8d75c26165f792745c20ab"
  },
  {
    "url": "assets/js/11.ed5fcb17.js",
    "revision": "507cc9d0784dbfa37e8da6212b17ef18"
  },
  {
    "url": "assets/js/12.4bfb2a9b.js",
    "revision": "78b0a792e94a9cf072562e641ddc49db"
  },
  {
    "url": "assets/js/13.55ebcab3.js",
    "revision": "dedc976e0476b4f31dde7999cc096d8d"
  },
  {
    "url": "assets/js/14.de1560ea.js",
    "revision": "45a51574b572c6d408a50af43244a654"
  },
  {
    "url": "assets/js/15.a4af903d.js",
    "revision": "23af008dc6c12e01d4c1e30c664923a8"
  },
  {
    "url": "assets/js/16.db845c63.js",
    "revision": "f90a15e48eb99274415c0929e03df9a6"
  },
  {
    "url": "assets/js/17.2f5e3fb1.js",
    "revision": "45f5c46e1839b2dbcb94d00351be55e1"
  },
  {
    "url": "assets/js/18.817c00d4.js",
    "revision": "fb13ea4db823ec73df254259e67668a5"
  },
  {
    "url": "assets/js/19.c1067540.js",
    "revision": "cf3dbac77333d05540d44f564c7dcb36"
  },
  {
    "url": "assets/js/2.8273ea93.js",
    "revision": "5e0073597844c307ce18a71af3f9761c"
  },
  {
    "url": "assets/js/20.5fd25ac2.js",
    "revision": "eade21597aabacce5d1e8b0850001ce1"
  },
  {
    "url": "assets/js/21.fe6fd9f9.js",
    "revision": "a168e64b2742968cc99519e54b5b0892"
  },
  {
    "url": "assets/js/22.9ad0125e.js",
    "revision": "db258e4d400df1b3b391a0acd9799e5b"
  },
  {
    "url": "assets/js/23.f9084ade.js",
    "revision": "954d1374d25c213b80af12ac46e14ca8"
  },
  {
    "url": "assets/js/24.55c6e71e.js",
    "revision": "a9bd15db5a7c182c84babee44800518f"
  },
  {
    "url": "assets/js/26.ea8144ba.js",
    "revision": "9b3c45b8ec882ce1d0a8f8b84e792959"
  },
  {
    "url": "assets/js/3.6a881f6e.js",
    "revision": "8dab2bc7aa0d692e6172e683f9d889d2"
  },
  {
    "url": "assets/js/4.ca31c247.js",
    "revision": "c75c55d2b1293642a6abb71a50341e3a"
  },
  {
    "url": "assets/js/5.46a77ca8.js",
    "revision": "2b328d42691e149ba5c6f24a6cac1be9"
  },
  {
    "url": "assets/js/6.df70649c.js",
    "revision": "e60fe032d8a388dac6d5864343d891e4"
  },
  {
    "url": "assets/js/7.ac02f1a2.js",
    "revision": "808fc1b80330e3048ef01581c3663ef7"
  },
  {
    "url": "assets/js/8.08dc64eb.js",
    "revision": "ad4b78021be9f7e092936b365e05d300"
  },
  {
    "url": "assets/js/9.1cb43c42.js",
    "revision": "ddaf79043fa893458655a3c4a565fb01"
  },
  {
    "url": "assets/js/app.5b10b4bb.js",
    "revision": "8684ac49e20912e56c26e8f0a3c4ffbf"
  },
  {
    "url": "conclusion/index.html",
    "revision": "629a3dcd6b27f239379b34dace3ffe65"
  },
  {
    "url": "design/index.html",
    "revision": "bd1ead8b7761fca4b6ee6c86d80b81f4"
  },
  {
    "url": "index.html",
    "revision": "1ce4eb034fc1d973c8987bf333716add"
  },
  {
    "url": "intro/index.html",
    "revision": "f226f5fd99ba1951c323b4886dbce47f"
  },
  {
    "url": "license.html",
    "revision": "c6ae94487788630ac26fdec72cecb7f2"
  },
  {
    "url": "myAvatar.png",
    "revision": "b76db1e62eb8e7fca02a487eb3eac10c"
  },
  {
    "url": "requirements/index.html",
    "revision": "5f5644b693bba682bd3fc5b5eaceeee0"
  },
  {
    "url": "requirements/stakeholders-needs.html",
    "revision": "9046d395cdfd35ac9b04f9cac92f0b72"
  },
  {
    "url": "requirements/state-of-the-art.html",
    "revision": "e8d014db4d75e468356d0a46132112d3"
  },
  {
    "url": "software/index.html",
    "revision": "3e14f42fff94684f5ae9f7974d19ecc9"
  },
  {
    "url": "test/index.html",
    "revision": "670636c1d593f875f28ba905d3d88fdd"
  },
  {
    "url": "use cases/index.html",
    "revision": "351d85b52d34bdb5e887038a427c0cc9"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
