import LiquidEffects from "./components/LiquidEffects";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <LiquidEffects />
      <div
        className="ripples"
        style={{
          height: "100vh",
          backgroundImage: "url('/images/bg-1.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="menu-anchor">
        <a style={{ textDecoration: "none" }}>
          <div className="menu-wrap">
            <div className="menu-logo-wrap">
              111111
            </div>
            <div className="menu-items-wrap">
              <div className="menu-item-stack">
                <p className="menu-item-text">liquidGL</p>
                <div className="download-wrapper">
                  <div className="download-link">
                    222222
                    <p className="small-text-link">Download</p>
                  </div>
                  <p className="version-text">v1.0.0</p>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
      <div className="content">
        <div className="hero-image-wrapper">
          <Image
            src="/images/bg-1.jpeg"
            alt="Mountain landscape"
            width={800}
            height={300}
            className="hero-image"
          />
        </div>

        <h1>Liquid Glass JS Library</h1>

        <p style={{ textAlign: "center", margin: "20px 0" }}>
          <Link
            href="https://github.com/dashersw/liquid-glass-js"
            target="_blank"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "25px",
              color: "#007aff",
              textDecoration: "none",
              fontWeight: 500,
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
            }}
          >
            🐙 View on GitHub
          </Link>
        </p>

        <p>
          <strong>Inspired by Apple's new Liquid Glass design language</strong>,
          this WebGL-powered library brings Vision Pro-style glass effects to
          the web with sophisticated refraction, blur, and masking systems.
        </p>

        <h2>Advanced Glass Effects Architecture</h2>
        <p>
          Our library implements real-time glass rendering using WebGL shaders
          with multi-layer refraction systems. Each glass element samples the
          background through sophisticated algorithms that simulate physical
          glass properties including edge distortion, rim effects, and
          customizable center warping.
        </p>

        <Image
          src="/images/bg-2.jpeg"
          alt="Forest path"
          width={800}
          height={400}
          className="content-image"
        />

        <p>
          The glass effects dynamically sample these background images, creating
          realistic refraction and blur that adapts to any content beneath the
          glass surfaces.
        </p>

        <Image
          src="/images/bg-3.jpeg"
          alt="Lake and mountains"
          width={800}
          height={400}
          className="content-image"
        />

        <p>
          Notice how the glass buttons above interact with different image
          content - the WebGL shaders analyze the background in real-time to
          create convincing glass distortion effects.
        </p>

        <Image
          src="/images/bg-1.jpeg"
          alt="Mountain vista"
          width={800}
          height={400}
          className="content-image"
        />

        <p>
          Each glass element uses sophisticated sampling techniques to blur and
          refract the content behind it, creating depth and visual hierarchy
          while maintaining readability.
        </p>

        <Image
          src="/images/bg-4.jpeg"
          alt="Forest landscape"
          width={800}
          height={400}
          className="content-image"
        />

        <p>
          The scrolling interaction demonstrates how glass elements maintain
          their effects during dynamic page movement, continuously updating
          their background sampling.
        </p>

        <Image
          src="/images/bg-5.jpeg"
          alt="Nature scene"
          width={800}
          height={400}
          className="content-image"
        />

        <p>
          Try adjusting the real-time controls to see how different parameters
          affect the glass rendering - from subtle transparency to dramatic
          refraction.
        </p>

        <Image
          src="/images/bg-6.jpeg"
          alt="Woodland path"
          width={800}
          height={400}
          className="content-image"
        />

        <p>
          This extensive content ensures the glass effects can be tested across
          various backgrounds and scroll positions, demonstrating the robustness
          of the WebGL implementation.
        </p>

        <div className="gradient-banner">
          <h2>Beautiful glass effects with real images!</h2>
        </div>

        <h2>Technical Capabilities & Architecture</h2>

        <h3>🎯 Button & Container Types</h3>
        <p>
          The library supports three distinct geometric shapes, each with
          specialized WebGL shader calculations:
        </p>
        <ul>
          <li>
            <strong>Rounded Rectangles</strong> - Classic iOS-style buttons with
            customizable corner radius
          </li>
          <li>
            <strong>Perfect Circles</strong> - Circular buttons ideal for icons
            and compact controls
          </li>
          <li>
            <strong>Pill/Capsule Shapes</strong> - Pharmaceutical-inspired
            elongated buttons with semicircular ends
          </li>
        </ul>

        <h3>⚙️ Real-Time Control System</h3>
        <p>
          Every glass parameter is controllable via the live settings panel
          (which itself is a glass container):
        </p>
        <ul>
          <li>
            <strong>Edge & Rim Intensity</strong> - Controls glass refraction
            strength at boundaries
          </li>
          <li>
            <strong>Distance Falloffs</strong> - Exponential curves that define
            effect areas
          </li>
          <li>
            <strong>Center Warp Toggle</strong> - Optional content distortion
            for dramatic effects
          </li>
          <li>
            <strong>Corner Enhancement</strong> - Specialized corner light
            effects
          </li>
          <li>
            <strong>Ripple Textures</strong> - Surface imperfection simulation
          </li>
          <li>
            <strong>Blur Radius</strong> - Background defocus amount
          </li>
          <li>
            <strong>Tint Opacity</strong> - Controls gradient overlay intensity
            from subtle (0.1) to warm (0.8)
          </li>
          <li>
            <strong>Randomize Button</strong> - Generate creative glass effect
            combinations instantly
          </li>
        </ul>

        <h3>🏗️ Flexible Architecture</h3>
        <p>
          <strong>Container Class:</strong> Base glass surface with automatic
          child management, supports standalone page sampling or nested
          parent-child relationships. Each container can have its own
          tintOpacity setting.
        </p>
        <p>
          <strong>Button Class:</strong> Extends Container with text overlays,
          click handlers, and intelligent sizing. Buttons can work independently
          or as children of containers, with individual tint control.
        </p>
        <p>
          <strong>Nested Glass System:</strong> Child buttons sample their
          parent container's rendered output for true layered glass effects.
        </p>
        <p>
          <strong>Per-Instance Properties:</strong> Each glass element can have
          custom tintOpacity, borderRadius, and type settings for precise design
          control and visual hierarchy.
        </p>

        <h3>🔬 WebGL Implementation</h3>
        <p>Built with cutting-edge graphics techniques:</p>
        <ul>
          <li>
            <strong>Multi-Layer Refraction</strong> - Separate edge, rim, and
            base intensity calculations
          </li>
          <li>
            <strong>Shape-Aware Normals</strong> - Different algorithms for
            rounded rectangles, circles, and pills
          </li>
          <li>
            <strong>Gaussian Blur Sampling</strong> - 13×13 adaptive blur with
            circular masking
          </li>
          <li>
            <strong>Real-Time Page Capture</strong> - html2canvas integration
            for background sampling
          </li>
          <li>
            <strong>Dynamic Uniform Updates</strong> - Live parameter changes
            without shader recompilation
          </li>
        </ul>

        <h3>🚀 Endless Possibilities</h3>
        <p>
          This foundation enables countless UI patterns: navigation bars,
          modals, cards, notifications, dock systems, control panels, and any
          interface element where Apple's Liquid Glass aesthetic is desired. The
          real-time parameter system makes it perfect for design prototyping and
          creating unique glass signatures for different applications.
        </p>
        <p>
          <strong>Creative Examples:</strong> Use high tintOpacity (0.7+) for
          prominent control panels, subtle values (0.1-0.3) for elegant
          overlays, or randomize all parameters for unexpected artistic effects.
          Each glass element can have its own visual personality while
          maintaining the cohesive Liquid Glass aesthetic.
        </p>

        <p>
          <em>
            Experience the future of web interfaces with physically-accurate
            glass rendering that rivals native iOS and macOS applications.
          </em>
        </p>
      </div>
    </>
  );
}
