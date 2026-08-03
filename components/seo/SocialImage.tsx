export const SOCIAL_IMAGE_SIZE = { height: 630, width: 1200 } as const;

const SOCIAL_IMAGE_COLORS = {
  accent: "#c2410c",
  background: "#f8f8f7",
  text: "#171716",
  textSecondary: "#575754",
} as const;

type SocialImageProps = {
  subtitle: string;
  title: string;
};

export function SocialImage({ subtitle, title }: SocialImageProps) {
  return (
    <div
      style={{
        alignItems: "center",
        background: SOCIAL_IMAGE_COLORS.background,
        color: SOCIAL_IMAGE_COLORS.text,
        display: "flex",
        fontFamily: "Arial, sans-serif",
        height: "100%",
        justifyContent: "center",
        padding: "72px",
        width: "100%",
      }}
    >
      <div
        style={{
          alignItems: "flex-start",
          display: "flex",
          flexDirection: "column",
          maxWidth: "980px",
          width: "100%",
        }}
      >
        <div
          style={{
            color: SOCIAL_IMAGE_COLORS.accent,
            display: "flex",
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          QUBO
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "-3px",
            lineHeight: 1.05,
            marginTop: "44px",
            maxWidth: "920px",
          }}
        >
          {title}
        </div>
        <div
          style={{
            color: SOCIAL_IMAGE_COLORS.textSecondary,
            display: "flex",
            fontSize: 30,
            marginTop: "40px",
          }}
        >
          {subtitle}
        </div>
      </div>
    </div>
  );
}
