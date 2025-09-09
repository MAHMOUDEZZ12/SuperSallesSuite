
'use client';

import React from 'react';
import Link from 'next/link';
import { IconMap } from './icon-map';

export function ToolCard({
  tool,
}: {
  tool: { title: string; href: string; description: string; icon: string; color: string; };
}) {
  const Icon = IconMap[tool.icon];
  return (
    <Link href={tool.href} className="group">
        <div className="flex h-full flex-col justify-between rounded-2xl border p-5 transition-colors duration-300 hover:border-lime-400">
            <div>
            <div
                className="mb-3 w-fit rounded-lg p-3"
                style={{ backgroundColor: tool.color }}
            >
                <Icon className="size-6 text-white" />
            </div>
            <h4 className="text-lg font-semibold">{tool.title}</h4>
            <p className="mt-2 text-sm text-neutral-400">{tool.description}</p>
            </div>
        </div>
    </Link>
  );
}
