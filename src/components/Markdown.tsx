import _Markdown, {Options} from "react-markdown";
import remarkGfm from 'remark-gfm';
import { useEffect, useState, type ReactNode } from "react";

function isVideoCandidate(href?: string) {
  if (!href) return false;

  try {
    const url = new URL(href);

    const isGitHubAttachment =
      url.hostname === "github.com" &&
      url.pathname.startsWith("/user-attachments/assets/");

    const hasVideoExtension = /\.(mp4|webm|ogg)$/i.test(url.pathname);

    return isGitHubAttachment || hasVideoExtension;
  } catch {
    return false;
  }
}

function Link({ href, children, title }: {
  href?: string;
  children: ReactNode;
  title?: string;
}) {
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    setVideoFailed(false);
  }, [href]);

  if (isVideoCandidate(href) && !videoFailed) {
    return (
      <video
        src={href}
        controls
        preload="metadata"
        playsInline
        onError={() => setVideoFailed(true)}
      />
    );
  }

  return (
    <a href={href} title={title}>
      {children}
    </a>
  );
}

export default function Markdown(args: Options) {
  return (
    <_Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: Link,
      }}
      {...args}
      />
  );
}
