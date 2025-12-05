import json
import sys

try:
    with open(r"c:\Users\artur\OneDrive\Escritorio\localhost_3000-20251204T152154.json", 'r', encoding='utf-8') as f:
        data = json.load(f)

    print("--- SCORES ---")
    for cat_id, cat in data['categories'].items():
        print(f"{cat['title']}: {int(cat['score'] * 100)}")

    print("\n--- TOP OPPORTUNITIES (Performance) ---")
    audits = data['audits']
    # Get opportunities from performance category
    perf_audit_refs = data['categories']['performance']['auditRefs']
    
    opportunities = []
    for ref in perf_audit_refs:
        audit = audits[ref['id']]
        # Look for audits with 'opportunity' in details type or just high impact
        if audit.get('score') != 1 and audit.get('scoreDisplayMode') != 'notApplicable':
             # Check if it has numericValue (savings)
            savings = audit.get('numericValue', 0)
            if savings > 0 and audit.get('score') is not None and audit.get('score') < 0.9:
                opportunities.append({
                    'id': ref['id'],
                    'title': audit['title'],
                    'score': audit['score'],
                    'displayValue': audit.get('displayValue'),
                    'numericValue': savings
                })
    
    # Sort by savings (descending)
    opportunities.sort(key=lambda x: x['numericValue'], reverse=True)
    
    for opp in opportunities[:10]:
        print(f"[{opp['score']}] {opp['title']} ({opp['displayValue']}) - ID: {opp['id']}")

    print("\n--- DIAGNOSTICS ---")
    # Check for specific diagnostics like LCP, CLS
    metrics = ['first-contentful-paint', 'largest-contentful-paint', 'cumulative-layout-shift', 'total-blocking-time', 'speed-index']
    for m in metrics:
        if m in audits:
            print(f"{audits[m]['title']}: {audits[m]['displayValue']}")

except Exception as e:
    print(f"Error: {e}")
