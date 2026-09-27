import React from 'react';
import { COMPARISON_DATA } from '../data/content';

interface ComparisonTableProps {
  data?: any;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ data }) => {
  const heading = data?.heading || data?.title || "Who we aren't";
  const subheading = data?.subheading || data?.description || "Most content agencies look the same. Here's what makes working with GLS different.";
  const activeRows = (data?.rows && data.rows.length > 0) ? data.rows : (data?.items && data.items.length > 0) ? data.items : COMPARISON_DATA;

  return (
    <section className="py-14 sm:py-20 bg-[#FFF9F3]" id="who-we-arent">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Heading matching image.png */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-5xl sm:text-6xl lg:text-[4.25rem] font-serif italic text-[#281B0C] tracking-tight">
            {heading}
          </h2>
          {subheading && (
            <p className="mt-5 text-base sm:text-lg text-stone-600 font-sans max-w-xl mx-auto leading-relaxed">
              {subheading}
            </p>
          )}
        </div>

        {/* Comparison Table Box from image.png */}
        <div className="bg-[#FFFDF9] border border-stone-200/90 rounded-[1.25rem] shadow-sm overflow-hidden max-w-5xl mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              {/* Dark header bar with rounded top corners */}
              <thead>
                <tr className="bg-[#262624] text-white">
                  <th className="py-5 px-8 w-[24%]"></th>
                  <th className="py-5 px-8 w-[38%] text-sm font-semibold tracking-wider uppercase text-[#88D47C]">
                    WHO WE ARE
                  </th>
                  <th className="py-5 px-8 w-[38%] text-sm font-semibold tracking-wider uppercase text-stone-300">
                    WHO WE AREN&apos;T
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200/70 font-sans">
                {activeRows.map((row: any, idx: number) => (
                  <tr key={idx} className="hover:bg-stone-50/60 transition-colors">
                    {/* Dimension Name Column */}
                    <td className="py-7 px-8 text-xs font-semibold tracking-widest text-stone-600 uppercase">
                      {row.dimension}
                    </td>

                    {/* GLS Column with checkmark */}
                    <td className="py-7 px-8 text-base text-stone-800">
                      <div className="flex items-start gap-3">
                        <span className="text-[#65B757] font-medium text-lg leading-none select-none shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span className="leading-snug text-stone-800 text-[1.02rem]">
                          {row.gls}
                        </span>
                      </div>
                    </td>

                    {/* OTHERS Column with cross */}
                    <td className="py-7 px-8 text-base text-stone-600">
                      <div className="flex items-start gap-3">
                        <span className="text-stone-400 font-medium text-lg leading-none select-none shrink-0 mt-0.5">
                          ✕
                        </span>
                        <span className="leading-snug text-stone-600 text-[1.02rem]">
                          {row.others}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
