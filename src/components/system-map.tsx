import { edgePath, edges, groups, LABEL_SIZE, NODE_HEIGHT, nodes, nodeWidth, VIEWBOX, type NodeId } from "#root/content/architecture";

type Props = {
  /** Nodes drawn in the accent; edges between two highlighted nodes are accented too. */
  highlight: NodeId[];
  className?: string;
  /** Hide the group captions (used on small covers). */
  bare?: boolean;
  /** Crop the viewBox to the highlighted nodes (case-study covers). */
  crop?: boolean;
};

/** Server-rendered SVG of the generic CRM architecture. Purely decorative. */
export function SystemMap({ highlight, className, bare, crop }: Props) {
  const hot = new Set(highlight);
  let vb = `0 0 ${VIEWBOX.width} ${VIEWBOX.height}`;
  if (crop && highlight.length) {
    const sel = nodes.filter((n) => hot.has(n.id));
    const pad = 32;
    const x0 = Math.min(...sel.map((n) => n.x)) - pad;
    const y0 = Math.min(...sel.map((n) => n.y)) - pad;
    const x1 = Math.max(...sel.map((n) => n.x + nodeWidth(n))) + pad;
    const y1 = Math.max(...sel.map((n) => n.y + NODE_HEIGHT)) + pad;
    vb = `${x0} ${y0} ${x1 - x0} ${y1 - y0}`;
  }
  return (
    <svg
      viewBox={vb}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
      data-system-map
    >
      <g fill="none" strokeWidth={1}>
        {edges.map((e) => {
          const on = hot.has(e.from) && hot.has(e.to);
          return (
            <path
              key={`${e.from}-${e.to}`}
              d={edgePath(e)}
              data-from={e.from}
              data-to={e.to}
              className={`map-edge ${on ? "stroke-accent" : "stroke-line-strong"}`}
            />
          );
        })}
      </g>
      {!bare &&
        groups.map((g) => (
          <text key={g.label} x={g.x} y={g.y} className="fill-faint font-mono uppercase" fontSize={10} letterSpacing="0.08em" fontWeight={500}>
            {g.label}
          </text>
        ))}
      {nodes.map((n) => {
        const on = hot.has(n.id);
        return (
          <g key={n.id} data-node={n.id} className="map-node">
            <rect
              x={n.x}
              y={n.y}
              width={nodeWidth(n)}
              height={NODE_HEIGHT}
              rx={6}
              className={`fill-surface ${on ? "stroke-accent" : "stroke-line-strong"}`}
              strokeWidth={1}
            />
            <text
              x={n.x + 12}
              y={n.y + 18}
              fontSize={LABEL_SIZE}
              letterSpacing="0.02em"
              className={`font-mono ${on ? "fill-ink" : "fill-muted"}`}
            >
              {n.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
