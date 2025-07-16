function calculateSubnet() {
  const ip = document.getElementById("ip").value;
  const cidr = parseInt(document.getElementById("cidr").value);
  const results = document.getElementById("results");

  if (!ip || isNaN(cidr) || cidr < 1 || cidr > 32) {
    results.innerHTML = "<p>Please enter a valid IP and CIDR.</p>";
    return;
  }

  const ipParts = ip.split(".").map(Number);
  if (ipParts.length !== 4 || ipParts.some(part => part < 0 || part > 255)) {
    results.innerHTML = "<p>Invalid IP address format.</p>";
    return;
  }

  const ipBinary = ipParts.map(part => part.toString(2).padStart(8, "0")).join("");
  const subnetMaskBinary = "1".repeat(cidr).padEnd(32, "0");
  const networkBinary = (parseInt(ipBinary, 2) & parseInt(subnetMaskBinary, 2)).toString(2).padStart(32, "0");
  const broadcastBinary = (parseInt(networkBinary, 2) | ~parseInt(subnetMaskBinary, 2) >>> 0).toString(2).padStart(32, "0");

  const toIP = bin => [0, 8, 16, 24].map(i => parseInt(bin.slice(i, i + 8), 2)).join(".");

  results.innerHTML = `
    <p><strong>Subnet Mask:</strong> ${toIP(subnetMaskBinary)}</p>
    <p><strong>Network Address:</strong> ${toIP(networkBinary)}</p>
    <p><strong>Broadcast Address:</strong> ${toIP(broadcastBinary)}</p>
    <p><strong>Number of Hosts:</strong> ${Math.pow(2, 32 - cidr) - 2}</p>
  `;
}
