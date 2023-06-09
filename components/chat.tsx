"use client";
import { useState, useCallback, useEffect } from "react";
import { SSE } from "sse.js";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { ElementContent, Components } from "react-markdown/lib/ast-to-react";
import Link from "next/link";
import favicon from "../static/favicon.png";
type Product = {
  url: string;
  image: string;
  description: string;
};

export default function Chat(): React.ReactElement {
  const [query, setQuery] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [incoming, setIncoming] = useState({ role: "ai", message: "" });
  const [newMessage, setNewMessage] = useState({
    role: "ai",
    message: "",
  });
  const [history, setHistory] = useState([]);
  const [finished, setFinished] = useState(true);
  const [message, setMessages] = useState([
    {
      role: "human",
      message: "Hi",
    },
    {
      role: "ai",
      message:
        "Hi there, I am Optimus Primark your personal shopping assistant here to help.",
    },
  ]);
  const [answer, setAnswer] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResponding, setIsResponding] = useState(false);
  const [hasError, setHasError] = useState(false);
  const cantHelp =
    answer?.trim() === "Sorry, I don't know how to help with that yet.";
  const status = isLoading
    ? "Optimus Primark is searching..."
    : isResponding
    ? "Optimus Primark is responding"
    : cantHelp || hasError
    ? "Optimus Primark is has failed you"
    : undefined;

  const handleConfirm = useCallback(async (query: string) => {
    setFinished(false);
    setMessages((prev) => [...prev, { role: "human", message: query }]);
    console.log(query);

    const eventSource = new SSE(`/query/api?query=${query}`);

    function handleError<T>(err: T) {
      setIsLoading(false);
      setFinished(true);
      setIsResponding(false);
      setHasError(true);
      console.error(err);
    }

    eventSource.addEventListener("error", handleError);
    eventSource.addEventListener("message", (e) => {
      try {
        setIsLoading(false);

        if (e.data === "[DONE]") {
          setIsResponding(false);
          setFinished(true);
          return;
        }

        setIsResponding(true);
        setFinished(false);

        const completionResponse: any = JSON.parse(e.data);
        const [
          {
            delta: { content },
          },
        ] = completionResponse.choices;

        setAnswer((answer) => {
          if (content !== undefined) {
            return (answer ?? "") + content;
          }
          return answer;
        });
      } catch (err) {
        handleError(err);
      }
    });

    eventSource.stream();

    setIsLoading(true);
    setFinished(false);
  }, []);

  function handleResetPrompt() {
    setQuery("");
    setAnswer(undefined);
    setIsResponding(false);
    setHasError(false);
  }

  const renderers = {
    h1({ node, ...props }) {
      return <h1 className="font-extrabold" {...props} />;
    },
    p({ node, ...props }) {
      return <p className="text-base" {...props} />;
    },
    img({ node, ...props }) {
      return (
        <Image
          src={props.src!}
          alt={props.alt!}
          title={props.title!}
          width={300}
          height={300}
          className="rounded-lg w-full h-auto"
        />
      );
    },
    ol({ node, ...props }) {
      return (
        <ol className="list-none" {...props}>
          <div className="space-y-10">{props.children}</div>
        </ol>
      );
    },
    li({ node, ...props }) {
      node.children &&
        node.children.map((child) => {
          console.log(child);
        });
      return (
        <li className="flex justify-end list-none" {...props}>
          <div className="card w-96 bg-base-100 shadow-xl space-y-10">
            {props.children}
          </div>
        </li>
      );
    },
    a({ node, ...props }) {
      const link = node.properties?.href as string;
      return (
        <div className="py-5">
          <Link href={link} target="_blank">
            <button className="btn btn-primary w-full">Buy Now</button>
          </Link>
        </div>
      );
    },
  } as Components;

  useEffect(() => {
    setNewMessage(incoming);
  }, [incoming]);

  useEffect(() => {
    if (newMessage.message) {
      setMessages((prevMsgs) => [...prevMsgs, newMessage]);
    }
  }, [finished]);

  return (
    <div
      className={`mx-auto max-h-full flex flex-col gap-4 rounded-lg p-4 md:pt-6 md:px-6 pb-2 w-full overflow-hidden border text-left border-scale-500 cursor-auto relative min-w-[340px]`}
    >
      <input
        className="input input-primary"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="I am Optimus Primark your personal shopping assistant here to help."
        onKeyDown={(e) => {
          switch (e.key) {
            case "Enter":
              handleConfirm(query);
              return;
            default:
              return;
          }
        }}
      ></input>

      {isLoading ||
        hasError ||
        (isResponding && (
          <div className="flex flex-row">
            <div>{status}</div>
            <div className="pl-4">
              <span className="loading loading-bars loading-md"></span>
            </div>
          </div>
        ))}
      <div className="chat chat-start">
        {question && (
          <p className="text-sm text-scale-500 dark:text-scale-300">
            {question}
          </p>
        )}
      </div>
      <div className="chat chat-end">
        {answer && (
          <div className="w-96 flex text-sm text-scale-500 dark:text-scale-300 justify-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <Image src={favicon} width={30} height={30} alt="logo" />
              </div>
            </div>
            <ReactMarkdown
              className="space-y-3 p-5"
              remarkPlugins={[remarkGfm]}
              components={renderers}
            >
              {answer}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
