export default function AIConstructionPrevention() {
  return (
    <>
      <p>
        It usually starts the same way. A mechanical crew has spent the week running a main duct down a corridor ceiling, exactly where the drawing put it. Then the sprinkler fitters arrive, and their line needs the same twelve inches of space. Above both sits a structural beam neither trade&apos;s model quite accounted for. Everybody built what they were given. But now the duct has to move, the ceiling grid behind it has to move, and the electricians scheduled for Monday are standing around a problem created weeks ago and only discovered today.
      </p>
      <p>
        Ask anyone who has run a job: the expensive part was never the duct. It was the sequence collapsing behind it: the remobilization, the re-sequencing, the quiet overtime that never shows up as a line item called &quot;we found out too late.&quot; Construction has a discovery problem. Problems are rarely found when they are created. They are found when somebody else trips over them.
      </p>
      <p>
        The numbers are sobering. McKinsey has noted that large projects typically take 20% longer than scheduled and run up to 80% over budget. Studying 3,900 professionals, Autodesk and FMI estimated that &quot;bad data&quot; — information that is inaccurate, incomplete or inconsistent — may have cost the industry $1.85 trillion in 2020, including $88.69 billion in rework alone.
      </p>
      <p>
        Most construction problems are born quietly and announced loudly, weeks later, when fixing them costs far more. The traditional response is heroic firefighting: talented people working very hard, very late. What AI changes is not the firefighting. It is the timing, moving discovery upstream to when a problem is a line on a screen instead of a crew standing idle.
      </p>

      <h3>Seeing the gap between the plan and the building</h3>
      <p>
        On a Kaiser Permanente project in San Diego, a Doxel robot roamed the site capturing 3D scans, while deep-learning algorithms compared what was actually installed against the project plan. Deviations that once surfaced at month&apos;s end surfaced within days, while the crews who could fix them were still in the area. The project came in 11% under budget, with labor productivity up 38%. A slip of three days is a conversation; a slip of three weeks is a claim, and daily measurement is what turns one into the other.
      </p>

      <h3>Risk leaves fingerprints</h3>
      <p>
        Progress is only half the story. The other half is pattern recognition across the thousands of signals a project generates every day: issues, checklist observations, RFIs, safety walk notes. Autodesk&apos;s Construction IQ was trained on more than 150 million construction issues and checklist observations from nearly 30,000 real projects, learning which combinations tend to precede quality failures and safety incidents. At BAM Ireland, quality and safety issues fell 20%, and with the highest-risk items surfaced automatically, staff spent 25% more of their time on the issues that actually mattered. Not more inspections, but better aim: a project manager&apos;s scarcest resource is not data. It is attention.
      </p>

      <h3>When the model meets the building</h3>
      <p>
        The most literal prevention is the clash itself — the duct and the beam, caught before steel and sheet metal ever meet. Buildots does this on Intel&apos;s semiconductor fab program, where helmet-mounted cameras and AI compare what has been built against the BIM model. The stakes explain the investment: each fab carries more than 50,000 activities and costs up to $10 billion, so a coordination error repeated across a floor plate is a financial event. Around a quarter of flagged errors triggered immediate fixes, and Intel recorded a 4.3% reduction in rework costs and roughly four weeks of avoided delays per fab. Nobody discovered a problem by walking into it. The discovery moved to a screen, days or weeks ahead of the crew.
      </p>

      <h3>Prevention is a timing advantage</h3>
      <p>
        None of this removes people from the loop. An algorithm can flag a deviation; it cannot decide whether to move the duct, move the beam penetration or redesign the run. What AI changes is when those human judgments get made, while options are still cheap and numerous.
      </p>
      <p>
        So picture the corridor again. Same duct, same beam, same crowded ceiling. But this time the conflict surfaces in a scan, days before the install crew mobilizes. The fix is a rerouted line and a short conversation. No demolition, no idle crews. Prevention rarely looks dramatic, and that is exactly the point. The best problems a construction team ever solves are the ones nobody on site ever knew existed.
      </p>

      <h3>Sources</h3>
      <ul className="article-sources">
        <li>
          McKinsey &amp; Company, Imagining construction&apos;s digital future (2016), as reviewed by Geo Week News:{' '}
          <a href="https://www.geoweeknews.com/news/where-the-construction-industry-stands-six-years-after-mckinsey-s-technology-report" target="_blank" rel="noopener noreferrer">
            Geo Week News
          </a>
        </li>
        <li>
          Autodesk &amp; FMI Corp., Harnessing the Data Advantage in Construction (2021):{' '}
          <a href="https://www.ForConstructionPros.com/business/business-services/financing-insurance-leasing/press-release/21747405/autodesk-autodesk-and-fmi-study-says-better-data-strategies-could-save-global-construction-185t" target="_blank" rel="noopener noreferrer">
            ForConstructionPros.com
          </a>
        </li>
        <li>
          NVIDIA Technical Blog, &quot;Autonomous Robot Helps Keep Construction Projects on Track&quot; (Doxel and Kaiser Permanente):{' '}
          <a href="https://developer.nvidia.com/blog/autonomous-robot-helps-keep-construction-projects-on-track/" target="_blank" rel="noopener noreferrer">
            developer.nvidia.com
          </a>
        </li>
        <li>
          Autodesk / For Construction Pros, &quot;Machine Learning is Reducing Risk on Construction Projects&quot; (Construction IQ and BAM Ireland):{' '}
          <a href="https://www.forconstructionpros.com/construction-technology/press-release/21048752/autodesk-machine-learning-is-reducing-risk-on-construction-projects" target="_blank" rel="noopener noreferrer">
            forconstructionpros.com
          </a>
        </li>
        <li>
          Buildots case study, &quot;Intel reduces rework and avoids construction delays&quot;:{' '}
          <a href="https://buildots.com/case-studies/intel-partners-with-buildots/" target="_blank" rel="noopener noreferrer">
            buildots.com
          </a>
        </li>
      </ul>

      <div className="article-author-box">
        <div className="article-author-avatar" aria-hidden="true">
          <img src="/experts/Manan%20pic.jpg" alt="" className="article-author-avatar-img" />
        </div>
        <div className="article-author-info">
          <p className="article-author-name"><strong>Manan Anand – Author</strong></p>
          <p className="article-author-bio">
            Manan is the Operations Lead at iKites Consulting and an engineering graduate from the University of Waterloo.
          </p>
        </div>
      </div>

      <p className="article-disclaimer">
        <em>
          The views and opinions expressed in this article do not necessarily reflect the official position or views of iKites Consulting Inc. This content is intended for informational purposes only.
        </em>
      </p>
    </>
  )
}
