import { useMemo, useState } from "react";
import { governorates, product, site, variants } from "@/data/product";

export function OrderForm() {
  const [variant, setVariant] = useState(variants.options[0]!.id);
  const [qty, setQty] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gov, setGov] = useState(governorates[0]!);
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const chosen = variants.options.find((o) => o.id === variant)!;
  const total = useMemo(() => (product.price + chosen.extra) * qty, [chosen, qty]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim().length < 3 || phone.trim().length < 10 || address.trim().length < 5) {
      setError("من فضلك اكتب الاسم ورقم موبايل صحيح والعنوان بالتفصيل.");
      return;
    }
    setError("");
    const lines = [
      `طلب جديد — ${product.name}`,
      `الباكدج: ${chosen.name}`,
      `الكمية: ${qty}`,
      `الإجمالي: ${total} ${site.currency}`,
      `الاسم: ${name}`,
      `الموبايل: ${phone}`,
      `المحافظة: ${gov}`,
      `العنوان: ${address}`,
      notes.trim() ? `ملاحظات: ${notes}` : "",
    ].filter(Boolean);
    const url = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const field =
    "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

  return (
    <form
      id="order"
      onSubmit={submit}
      className="space-y-5 rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-7"
    >
      <div className="pe-14">
        <h2 className="text-2xl">اطلب الآن — الدفع عند الاستلام</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          املأ البيانات وهنبعت طلبك على واتساب فورًا للتأكيد.
        </p>
      </div>

      <div className="space-y-2">
        <span className="text-sm font-bold">{variants.label}</span>
        <div className="grid gap-2">
          {variants.options.map((o) => (
            <label
              key={o.id}
              className={`grid cursor-pointer grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border px-4 py-3 transition-colors ${
                variant === o.id ? "border-primary bg-accent" : "border-border hover:border-primary/50"
              }`}
            >
              <span className="flex min-w-0 items-center gap-3">
                <input
                  type="radio"
                  name="variant"
                  value={o.id}
                  checked={variant === o.id}
                  onChange={() => setVariant(o.id)}
                  className="size-4 shrink-0 accent-primary"
                />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-bold">{o.name}</span>
                  <span className="block text-xs text-muted-foreground">{o.note}</span>
                </span>
              </span>
              <span className="shrink-0 text-sm font-bold text-primary">
                {product.price + o.extra} {site.currency}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className={field}
          placeholder="الاسم بالكامل"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className={field}
          placeholder="رقم الموبايل"
          inputMode="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <select className={field} value={gov} onChange={(e) => setGov(e.target.value)}>
          {governorates.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 rounded-xl border border-input bg-background px-2">
          <button
            type="button"
            aria-label="تقليل الكمية"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="size-9 shrink-0 rounded-lg bg-secondary text-lg font-bold"
          >
            −
          </button>
          <span className="text-center text-sm font-bold">{qty} قطعة</span>
          <button
            type="button"
            aria-label="زيادة الكمية"
            onClick={() => setQty((q) => Math.min(10, q + 1))}
            className="size-9 shrink-0 rounded-lg bg-secondary text-lg font-bold"
          >
            +
          </button>
        </div>
        <input
          className={`${field} sm:col-span-2`}
          placeholder="العنوان بالتفصيل (المدينة، الشارع، رقم العقار)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <textarea
          className={`${field} sm:col-span-2`}
          rows={2}
          placeholder="ملاحظات (اختياري)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {error ? <p className="text-sm font-bold text-destructive">{error}</p> : null}

      <div className="flex items-center justify-between rounded-2xl bg-secondary px-4 py-3">
        <span className="text-sm text-muted-foreground">الإجمالي (شحن مجاني)</span>
        <span className="text-xl font-extrabold text-primary">
          {total} {site.currency}
        </span>
      </div>

      <button
        type="submit"
        className="w-full rounded-2xl bg-ember px-6 py-4 text-base font-extrabold text-primary-foreground shadow-ember transition-transform hover:scale-[1.01] active:scale-100"
      >
        تأكيد الطلب على واتساب
      </button>
      <p className="text-center text-xs text-muted-foreground">
        بتدفع للمندوب بعد الاستلام والفحص — ضمان استرجاع 14 يوم.
      </p>
    </form>
  );
}
