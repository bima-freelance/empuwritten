import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export default async function MessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-gray-900 mb-8">
        Pesan Masuk
      </h1>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <p className="text-sm text-gray-400 py-12 text-center">
            Belum ada pesan masuk.
          </p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`bg-white rounded-xl border p-5 ${
                msg.read ? "border-gray-100" : "border-brand-200 bg-brand-50/30"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-gray-900">{msg.name}</p>
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-sm text-brand-600 hover:underline"
                  >
                    {msg.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {!msg.read && (
                    <span className="text-xs bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full font-medium">
                      Baru
                    </span>
                  )}
                  <time className="text-xs text-gray-400">
                    {formatDate(msg.createdAt)}
                  </time>
                </div>
              </div>
              <p className="mt-3 text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                {msg.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
