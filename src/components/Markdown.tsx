import _Markdown, {Options} from "react-markdown";
import remarkGfm from 'remark-gfm';
import type { ReactNode, VideoHTMLAttributes } from "react";

type MarkdownNode = {
  type: string;
  value?: string;
  children?: MarkdownNode[];
};

function remarkVideoTags() {
  return (tree: MarkdownNode) => {
    function transform(node: MarkdownNode) {
      if (!node.children) return;

      node.children = node.children.map((child) => {
        if (child.type === "html" && child.value) {
          const videoTag = child.value.match(/^<video\b([^>]*)>\s*(?:<\/video\s*>)?$/i);
          const src = videoTag?.[1].match(/\bsrc\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/i);
          const href = src?.[1] ?? src?.[2] ?? src?.[3];

          if (href) {
            return {
              type: "video",
              data: {
                hName: "video",
                hProperties: {
                  src: href,
                  controls: true,
                  preload: "metadata",
                  playsInline: true,
                },
              },
            };
          }
        }

        transform(child);
        return child;
      });
    }

    transform(tree);
  };
}

function Video({src}: VideoHTMLAttributes<HTMLVideoElement> & {node?: unknown}) {
  return <video src={src} controls preload="metadata" playsInline />;
}

function Link({ href, children, title }: {
  href?: string;
  children?: ReactNode;
  title?: string;
}) {
  return (
    <a href={href} title={title}>
      {children}
    </a>
  );
}

function AddVideoPlugins(args: Options) {
  return (
    <_Markdown
      {...args}
      remarkPlugins={[remarkGfm, remarkVideoTags]}
      components={{
        a: Link,
        video: Video,
      }}
    />
  );
}

export default function Markdown(args: Options) {
  return AddVideoPlugins(args);
}
