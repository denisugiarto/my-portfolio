import React from "react";
type SocialMediaShareButtonProps = {
  link: string;
  text: string;
};
function SocialMediaShareButton({ link, text }: SocialMediaShareButtonProps) {
  return (
    <div className="sharing-buttons flex flex-wrap">
      <a
        className="ease mb-1 mr-1 inline-flex items-center rounded border-2 border-sky-600 bg-sky-600 p-1 text-white transition duration-200 hover:border-sky-700 hover:bg-sky-700"
        target="_blank"
        rel="noopener"
        href={`https://facebook.com/sharer/sharer.php?u=${link}`}
        aria-label="Share on Facebook"
        draggable="false"
      >
        <svg
          aria-hidden="true"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="h-4 w-4"
        >
          <title>Facebook</title>
          <path d="M379 22v75h-44c-36 0-42 17-42 41v54h84l-12 85h-72v217h-88V277h-72v-85h72v-62c0-72 45-112 109-112 31 0 58 3 65 4z"></path>
        </svg>
      </a>
      <a
        className="ease mb-1 mr-1 inline-flex items-center rounded border-2 border-sky-600 bg-sky-600 p-1 text-white transition duration-200 hover:border-sky-700 hover:bg-sky-700"
        target="_blank"
        rel="noopener"
        href={`https://twitter.com/intent/tweet?url=${link}&amp;text=${text}`}
        aria-label="Share on Twitter"
        draggable="false"
      >
        <svg
          aria-hidden="true"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="h-4 w-4"
        >
          <title>Twitter</title>
          <path d="m459 152 1 13c0 139-106 299-299 299-59 0-115-17-161-47a217 217 0 0 0 156-44c-47-1-85-31-98-72l19 1c10 0 19-1 28-3-48-10-84-52-84-103v-2c14 8 30 13 47 14A105 105 0 0 1 36 67c51 64 129 106 216 110-2-8-2-16-2-24a105 105 0 0 1 181-72c24-4 47-13 67-25-8 24-25 45-46 58 21-3 41-8 60-17-14 21-32 40-53 55z"></path>
        </svg>
      </a>
      <a
        className="ease mb-1 mr-1 inline-flex items-center rounded border-2 border-sky-600 bg-sky-600 p-1 text-white transition duration-200 hover:border-sky-700 hover:bg-sky-700"
        target="_blank"
        rel="noopener"
        href="https://www.linkedin.com/shareArticle?mini=true&amp;url=http%3A%2F%2Flocalhost%3A3000%2Fblog%2Flevel-up-your-git-security-verified-commits-with-kleopatra-5147&amp;title=halo&amp;summary=halo&amp;source=http%3A%2F%2Flocalhost%3A3000%2Fblog%2Flevel-up-your-git-security-verified-commits-with-kleopatra-5147"
        aria-label="Share on Linkedin"
        draggable="false"
      >
        <svg
          aria-hidden="true"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="h-4 w-4"
        >
          <title>Linkedin</title>
          <path d="M136 183v283H42V183h94zm6-88c1 27-20 49-53 49-32 0-52-22-52-49 0-28 21-49 53-49s52 21 52 49zm333 208v163h-94V314c0-38-13-64-47-64-26 0-42 18-49 35-2 6-3 14-3 23v158h-94V183h94v41c12-20 34-48 85-48 62 0 108 41 108 127z"></path>
        </svg>
      </a>
      <a
        className="ease mb-1 mr-1 inline-flex items-center rounded border-2 border-sky-600 bg-sky-600 p-1 text-white transition duration-200 hover:border-sky-700 hover:bg-sky-700"
        target="_blank"
        rel="noopener"
        href="https://www.tumblr.com/widgets/share/tool?posttype=link&amp;title=halo&amp;caption=halo&amp;content=http%3A%2F%2Flocalhost%3A3000%2Fblog%2Flevel-up-your-git-security-verified-commits-with-kleopatra-5147&amp;canonicalUrl=http%3A%2F%2Flocalhost%3A3000%2Fblog%2Flevel-up-your-git-security-verified-commits-with-kleopatra-5147&amp;shareSource=tumblr_share_button"
        aria-label="Share on Tumblr"
        draggable="false"
      >
        <svg
          aria-hidden="true"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="h-4 w-4"
        >
          <title>Tumblr</title>
          <path d="M406 480c-14 15-50 32-98 32-120 0-147-89-147-141V227h-47c-6 0-10-4-10-10v-68c0-7 4-13 11-16 62-21 82-76 85-117 0-11 6-16 16-16h71c5 0 10 4 10 10v115h83c5 0 10 5 10 10v82c0 5-5 10-10 10h-84v133c0 34 24 54 68 36 5-2 9-3 13-2 3 1 6 3 7 8l22 64c2 5 4 10 0 14z"></path>
        </svg>
      </a>
      <a
        className="ease mb-1 mr-1 inline-flex items-center rounded border-2 border-sky-600 bg-sky-600 p-1 text-white transition duration-200 hover:border-sky-700 hover:bg-sky-700"
        target="_blank"
        rel="noopener"
        href="https://wa.me/?text=halo%20http%3A%2F%2Flocalhost%3A3000%2Fblog%2Flevel-up-your-git-security-verified-commits-with-kleopatra-5147"
        aria-label="Share on Whatsapp"
        draggable="false"
      >
        <svg
          aria-hidden="true"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="h-4 w-4"
        >
          <title>Whatsapp</title>
          <path d="M413 97A222 222 0 0 0 64 365L31 480l118-31a224 224 0 0 0 330-195c0-59-25-115-67-157zM256 439c-33 0-66-9-94-26l-7-4-70 18 19-68-4-7a185 185 0 0 1 287-229c34 36 56 82 55 131 1 102-84 185-186 185zm101-138c-5-3-33-17-38-18-5-2-9-3-12 2l-18 22c-3 4-6 4-12 2-32-17-54-30-75-66-6-10 5-10 16-31 2-4 1-7-1-10l-17-41c-4-10-9-9-12-9h-11c-4 0-9 1-15 7-5 5-19 19-19 46s20 54 23 57c2 4 39 60 94 84 36 15 49 17 67 14 11-2 33-14 37-27s5-24 4-26c-2-2-5-4-11-6z"></path>
        </svg>
      </a>
      <a
        className="ease mb-1 mr-1 inline-flex items-center rounded border-2 border-sky-600 bg-sky-600 p-1 text-white transition duration-200 hover:border-sky-700 hover:bg-sky-700"
        target="_blank"
        rel="noopener"
        href="https://telegram.me/share/url?text=halo&amp;url=http%3A%2F%2Flocalhost%3A3000%2Fblog%2Flevel-up-your-git-security-verified-commits-with-kleopatra-5147"
        aria-label="Share on Telegram"
        draggable="false"
      >
        <svg
          aria-hidden="true"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="h-4 w-4"
        >
          <title>Telegram</title>
          <path d="M256 8a248 248 0 1 0 0 496 248 248 0 0 0 0-496zm115 169c-4 39-20 134-28 178-4 19-10 25-17 25-14 2-25-9-39-18l-56-37c-24-17-8-25 6-40 3-4 67-61 68-67l-1-4-5-1q-4 1-105 70-15 10-27 9c-9 0-26-5-38-9-16-5-28-7-27-16q1-7 18-14l145-62c69-29 83-34 92-34 2 0 7 1 10 3l4 7a43 43 0 0 1 0 10z"></path>
        </svg>
      </a>
      <a
        className="ease mb-1 mr-1 inline-flex items-center rounded border-2 border-sky-600 bg-sky-600 p-1 text-white transition duration-200 hover:border-sky-700 hover:bg-sky-700"
        target="_blank"
        rel="noopener"
        href="mailto:?subject=halo&amp;body=http%3A%2F%2Flocalhost%3A3000%2Fblog%2Flevel-up-your-git-security-verified-commits-with-kleopatra-5147"
        aria-label="Share by Email"
        draggable="false"
      >
        <svg
          aria-hidden="true"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="h-4 w-4"
        >
          <title>Email</title>
          <path d="M464 64a48 48 0 0 1 29 86L275 314c-11 8-27 8-38 0L19 150a48 48 0 0 1 29-86h416zM218 339c22 17 54 17 76 0l218-163v208c0 35-29 64-64 64H64c-35 0-64-29-64-64V176l218 163z"></path>
        </svg>
      </a>
    </div>
  );
}

export default SocialMediaShareButton;
