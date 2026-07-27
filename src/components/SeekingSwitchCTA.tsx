"use client";

/**
 * Inline CTA for Seeking-related blog posts.
 * Renders as a styled box within blog content.
 * Use in blog post HTML via a placeholder div that gets hydrated.
 */
export default function SeekingSwitchCTA() {
  return null; // Not used as a component — we inject HTML directly into blog content
}

/**
 * HTML string for inline CTA — insert this into blog post content.
 * Styled to match the blog's dark theme.
 */
export const SEEKING_SWITCH_CTA_HTML = `
<div style="background: linear-gradient(135deg, #FFFFFF, #252017); border: 1px solid #C87F6E; padding: 24px; margin: 32px 0; border-radius: 8px; text-align: center;">
  <p style="margin: 0 0 8px; font-size: 16px; font-weight: 600; color: #1A1A1A;">Tired of walking on eggshells?</p>
  <p style="margin: 0 0 16px; font-size: 14px; color: #8A7E76;">Plus doesn't ban you for sugar dating language. Verified profiles, $99.99/month, no censorship.</p>
  <a href="/switch-from-seeking" style="display: inline-block; padding: 12px 32px; background: #C87F6E; color: #F5EDE4; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 6px;">Switch from Seeking &rarr;</a>
</div>`;
