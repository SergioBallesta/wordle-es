#!/bin/bash
# ═══════════════════════════════════════════════════════════
#  WORDLE EN ESPAÑOL — Setup & Push to GitHub
#  
#  USO:
#    chmod +x setup.sh
#    ./setup.sh TU_USUARIO_GITHUB
#
#  Ejemplo:
#    ./setup.sh sergiodev
# ═══════════════════════════════════════════════════════════

set -e

# ── Colores ──
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo ""
echo -e "${GREEN}🟩 Wordle en Español — Setup${NC}"
echo "═══════════════════════════════════════"

# ── Verificar argumento ──
if [ -z "$1" ]; then
  echo -e "${YELLOW}⚠  Uso: ./setup.sh TU_USUARIO_GITHUB${NC}"
  echo "   Ejemplo: ./setup.sh sergiodev"
  echo ""
  echo "   Primero crea el repo 'wordle-es' en GitHub (vacío, sin README)."
  exit 1
fi

USERNAME=$1
REPO_NAME="wordle-es"

echo ""
echo -e "${CYAN}→ Usuario: ${USERNAME}${NC}"
echo -e "${CYAN}→ Repo:    ${REPO_NAME}${NC}"
echo ""

# ── Actualizar README y vite.config con el username real ──
echo -e "${CYAN}[1/5]${NC} Personalizando archivos..."
sed -i "s|TU_USUARIO|${USERNAME}|g" README.md
sed -i "s|TU_USUARIO|${USERNAME}|g" vite.config.ts 2>/dev/null || true

# ── Instalar dependencias ──
echo -e "${CYAN}[2/5]${NC} Instalando dependencias..."
npm install

# ── Verificar build ──
echo -e "${CYAN}[3/5]${NC} Verificando build..."
npm run build
echo -e "      ${GREEN}✓ Build correcto${NC}"

# ── Inicializar git ──
echo -e "${CYAN}[4/5]${NC} Inicializando repositorio git..."
git init
git add .
git commit -m "🟩 Initial commit — Wordle en Español"
git branch -M main

# ── Push ──
echo -e "${CYAN}[5/5]${NC} Subiendo a GitHub..."
git remote add origin "https://github.com/${USERNAME}/${REPO_NAME}.git"
git push -u origin main

echo ""
echo -e "${GREEN}═══════════════════════════════════════${NC}"
echo -e "${GREEN}✅ ¡Listo! Repositorio subido.${NC}"
echo ""
echo -e "   📦 Repo:    https://github.com/${USERNAME}/${REPO_NAME}"
echo -e "   🌐 Deploy:  https://${USERNAME}.github.io/${REPO_NAME}/"
echo ""
echo -e "   ${YELLOW}⚡ El deploy automático se activará en ~1 minuto.${NC}"
echo -e "   ${YELLOW}   Asegúrate de ir a Settings → Pages → Source: GitHub Actions${NC}"
echo ""
echo -e "${GREEN}═══════════════════════════════════════${NC}"
